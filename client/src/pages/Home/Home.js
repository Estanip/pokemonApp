import React, { useState, useEffect } from 'react';
import { getOrderByName, getOrderByWeight, getPokemons, getPokemonByName, getPokemonsByType } from '../../actions/index';
import { connect } from 'react-redux';

function Home({ pokemons, pokemon, getPokemons, getPokemonByName, getOrderByName, getOrderByWeight, getPokemonsByType}) {

    const [inputName, setInput] = useState("");
    const [inputType, setInputType] = useState("");
    const [orderSetter, setOrder] = useState(0)
    const [page, setPage] = useState(0);
    const [message, setMessage] = useState("");

    useEffect(() => {

        getPokemons()

    }, []);

    console.log("POKEMON", pokemons)

    return (
        <div>
            <h1>Home</h1>
            <div>

            </div>
            <div>

                <button onClick={() => getOrderByName("ascendent")}>Ascendent Order</button>
                <button onClick={() => getOrderByName("descendent")}>Descendent Order</button>
                <button onClick={() => getOrderByWeight("ascendent")}>Ascendent Order</button>
                <button onClick={() => getOrderByWeight("descendent")}>Descendent Order</button>

                <input onChange={(e) => setInput(e.target.value)} name="inputName" placeholder="Busca Tu Pokemon" />
                <button onClick={() => getPokemonByName(inputName)} >Search by Name!</button>

                <input onChange={(e) => setInputType(e.target.value)} name="inputType" placeholder="Busca por Tipo" />
                <button onClick={() => getPokemonsByType(inputType)}>Search by Type!</button>

                {pokemon.pokemonName !== undefined

                    ?

                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Types</th>
                                <th>Image</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{pokemon.pokemonName}</td>
                                <td>
                                    {pokemon.types.map(e => {
                                        return <ul>
                                            <li>
                                                {e}
                                            </li>
                                        </ul>;
                                    })
                                    }
                                </td>
                                <td><img
                                    src={pokemon.image}
                                    alt="Pokemon"
                                />
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    :

                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Types</th>
                                <th>Image</th>
                                <th>Weight</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pokemons.map(pokemon => (
                                <tr>
                                    <td>{pokemon.name}</td>
                                    <td>
                                        {pokemon.types.map(e => {
                                            return <ul>
                                                <li>
                                                    {e}
                                                </li>
                                            </ul>;
                                        })
                                        }
                                    </td>
                                    <td><img
                                        src={pokemon.image}
                                        alt="Pokemon"
                                    />
                                    </td>
                                    <td>{pokemon.weight}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                }

            </div>
        </div>
    )
}

const mapStateToProps = (state) => {

    return {
        pokemons: state.pokemons,
        pokemon: state.pokemon
    }
};

const mapDispatchToProps = (dispatch) => {

    return {
        getPokemons: () => dispatch(getPokemons()),
        getOrderByName: (order) => dispatch(getOrderByName(order)),
        getOrderByWeight: (order) => dispatch(getOrderByWeight(order)),
        getPokemonByName: (name) => dispatch(getPokemonByName(name)),
        getPokemonsByType: (type) => dispatch(getPokemonsByType(type))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);