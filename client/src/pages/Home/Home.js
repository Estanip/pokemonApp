import React, { useState, useEffect } from 'react';
import { getPokemons } from '../../actions/index';
import { connect } from 'react-redux';
import SearchBy from '../../components/SearchBy/SearchBy';
import OrderBy from '../../components/OrderBy/OrderBy';
import Pagination from '../../components/Pagination/Pagination';
import DbPokemons from '../../components/DbPokemons/DbPokemons';

function Home({ getPokemons, pokemons }) {

    const [loading, setLoading] = useState(false);

    useEffect(() => {

        const getData = async () => {
            await getPokemons();
            setLoading(false)
        }

        getData();

    }, []);

    return (
        <div>
            <h1>Home</h1>

            <DbPokemons />
            <SearchBy />
            <OrderBy />

            {loading === true || pokemons[0] === null || pokemons.length === 0

                ?

                <div><h1>{loading === true ? "Cargando" : "No se encontraron resultados"}</h1></div>

                :

                <Pagination />
            }

        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        pokemons: state.pokemons
    }
}

const mapDispatchToProps = (dispatch) => {

    return {
        getPokemons: () => dispatch(getPokemons()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);