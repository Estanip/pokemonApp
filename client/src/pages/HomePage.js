import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function HomePage() {

    const [pokemons, setPokemons] = useState([]);
    const [pokemon, setPokemon] = useState([]);
    const [pokemonsFilter, setPokemonsFilter] = useState([])
    const [inputSearch, setInput] = useState("");
    const [message, setMessage] = useState("");
    const [filter, setFilter] = useState("")

    // show all pokemons
    const getPokemons = async () => {

        const result = await axios.get('http://localhost:3001/pokemons/filter');
        const pokObj = result.data.data;
        setPokemons(pokObj)
    };

    // show pokemon search by name
    const getPokemonByName = async () => {

        try {
            const result = await axios.get(`http://localhost:3001/pokemons?name=${inputSearch}`)
            const pok = result.data.data;
            setPokemons([])
            setPokemon(pok)
            setMessage("Pokemon Encontrado!")
        } catch (err) {
            setMessage("No existen pokemon con ese nombre")
        }

        setTimeout(() => {
            setMessage("")
        }, 3000);

    };

    // show pokemons search by type
    const getByType = async () => {

        try {
            const result = await axios.get('http://localhost:3001/pokemons/filter');
            const pokObj = result.data.data;
            const pokFil = [];
            for (let i = 0; i < pokObj.length; i++) {
                if (pokObj[i].types.includes(filter)) {
                    pokFil.push(pokObj[i]);
                }
            }
            setPokemonsFilter(pokFil);
            setPokemons([]);
        } catch (err) {
            setMessage("No existen pokemon con ese tipo")
        }
        setTimeout(() => {
            setMessage("")
        }, 3000);

    };

    const handleOnChange = (e) => {
        const { value } = e.target;
        setInput(value)
    };

    const handleFilter = (e) => {
        const { value } = e.target;
        setFilter(value)
    };

    useEffect(() => {
        getPokemons()
    }, []);


    return (
        <div>
            <h1>Home</h1>
            <div>
                <input onChange={handleOnChange} name="inputName" placeholder="Busca Tu Pokemon" />
                <button onClick={getPokemonByName} >Search!</button>

                {message && message}
                <input onChange={handleFilter} name="inputType" placeholder="Busca por Tipo" />
                <button onClick={getByType}  >Search!</button>

            </div>
            <div>

                {pokemon.length !== 0 &&

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
                                <td>{pokemon.pokName}</td>
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
                }

                {pokemonsFilter.length > 0 &&

                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Types</th>
                                <th>Image</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pokemonsFilter.map(pokemon => (
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
                                </tr>
                            ))}
                        </tbody>
                    </table>
                }

                {
                    pokemons.length > 0 &&

                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Types</th>
                                <th>Image</th>
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
                                </tr>
                            ))}
                        </tbody>
                    </table>
                }

            </div>
        </div>
    )
}
