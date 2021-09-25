import React, { useState, useEffect } from 'react';
import { getOrderByName, getOrderByForce, getPokemons,getDbPokemons } from '../../actions/index';
import { connect } from 'react-redux';
import Cards from '../../components/Cards/Cards';
import Card from '../../components/Card/Card';
import SearchBy from '../../components/SearchBy/SearchBy';

function Home({ pokemons, getPokemons, getOrderByName, getOrderByForce, getDbPokemons }) {

    const [loading, setLoading] = useState(true);
    const [orderSetter, setOrder] = useState(0);
    const [page, setPage] = useState(0);
    const [message, setMessage] = useState("");

    useEffect(() => {

        const getData = async () => {
            await getPokemons();
            setLoading(false)
        }

        getData(); 

    }, []);

    console.log(pokemons)

    return (
        <div>
            <h1>Home</h1>

                <button onClick={() => getOrderByName("ascendent")}>Ascendent Order</button>
                <button onClick={() => getOrderByName("descendent")}>Descendent Order</button>
                <button onClick={() => getOrderByForce("ascendent")}>Ascendent Order</button>
                <button onClick={() => getOrderByForce("descendent")}>Descendent Order</button>
                <button onClick={() => getDbPokemons()}>DB Pokemons</button>

                <SearchBy />

                {loading === true 

                ?

                <div><h1>Buscando COQUEMONES</h1></div>
                
                :
                    <Cards>
                        {pokemons.map((e,i) => <Card key={i} id={e.id} name={e.name} image={e.image} types={e.types} weight={e.weight}/>)}
                    </Cards>
                }

{/*               {pokemon.length && 
                    
                    <Cards>
                        <Card key={pokemon.id} id={pokemon.id} name={pokemon.pokemonName} image={pokemon.image} types={pokemon.types} weight={pokemon.weight}/>
                    </Cards>
                } */}

            </div>
)}

const mapStateToProps = (state) => {

    return {
            pokemons: state.pokemons
    }
};

const mapDispatchToProps = (dispatch) => {

    return {
        getPokemons: () => dispatch(getPokemons()),
        getOrderByName: (order) => dispatch(getOrderByName(order)),
        getOrderByForce: (order) => dispatch(getOrderByForce(order)),
        getDbPokemons: () => dispatch(getDbPokemons())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);