import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function HomePage() {

    const [pokemons, setPokemons] = useState([]);
    const [pokemon, setPokemon] = useState([]);
    const [pokemonsFilter, setPokemonsFilter] = useState([]);
    const [orderSetter, setOrder] = useState(0)
    const [inputSearch, setInput] = useState("");
    const [page, setPage] = useState(0);
    const [filter, setFilter] = useState("");
    const [message, setMessage] = useState("");

    // show all pokemons
    const getPokemons = async () => {

        const result = await axios.get('http://localhost:3001/pokemons/filter');
        const pokemons = result.data.data;
        
        if(page === 0) {
            const currentPage = pokemons.slice(0, 9)
            setPokemons(currentPage)
        }
        if(page === 1) {
            const page1 = pokemons.slice(9, 21)
            setPokemons(page1)
        }
        if(page === 2) {
            const page2 = pokemons.slice(21, 30)
            setPokemons(page2)
        }
        if(page === 3) {
            const page3 = pokemons.slice(30, pokemons.length - 1)
            setPokemons(page3)
        }
        if(page < 0) {
            setPage(0)
            setMessage("No hay mas paginas a mostrar")
        }
        if(page > 3) {
            setPage(3) 
            setMessage("No hay mas paginas a mostrar")
        }
        
        setTimeout(() => {
            setMessage("")
        }, 3000);

    };

    console.log(page)

    // show pokemon search by name
    const getPokemonByName = async () => {

        try {
            const result = await axios.get(`http://localhost:3001/pokemons?name=${inputSearch}`)
            const pokemon = result.data.data;
            setPokemons([])
            setPokemonsFilter([])
            setPokemon(pokemon)
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
            const pokemons = result.data.data;
            const pokemonsFilter = [];
            for (let i = 0; i < pokemons.length; i++) {
                if (pokemons[i].types.includes(filter)) {
                    pokemonsFilter.push(pokemons[i]);
                }
            }
            setPokemons([]);
            setPokemon([]);
            setPokemonsFilter(pokemonsFilter);
        } catch (err) {
            setMessage("No existen pokemon con ese tipo")
        }
        setTimeout(() => {
            setMessage("")
        }, 3000);

    };

    const orderByName = async () => {

        setOrder(orderSetter + 1);
        setPokemons([]);

        const result = await axios.get('http://localhost:3001/pokemons/orderbyname');
        const pokByName = result.data.data;

        if(orderSetter % 2 === 0) {
            setPokemons(pokByName);
        } else if(orderSetter % 2 !== 0) {
            pokByName.reverse();
            setPokemons(pokByName);
        }
    };

    const orderByForce = async () => {

        setOrder(orderSetter + 1);
        setPokemons([]);

        const result = await axios.get('http://localhost:3001/pokemons/orderbyforce');
        const pokByForce = result.data.data; 

        if(orderSetter % 2 === 0) {
            setPokemons(pokByForce);
        } else if(orderSetter % 2 !== 0) {
            pokByForce.reverse();
            setPokemons(pokByForce);
        }
    };

    useEffect(() => {
        getPokemons()
    }, [page]);


    return (
        <div>
            <h1>Home</h1>
            <div>
                <input onChange={(e) => setInput(e.target.value)} name="inputName" placeholder="Busca Tu Pokemon" />
                <button onClick={getPokemonByName} >Search by Name!</button>

                {message && message}
                <input onChange={(e) => setFilter(e.target.value)} name="inputType" placeholder="Busca por Tipo" />
                <button onClick={getByType}>Search by Type!</button>
                <button onClick={orderByName}>Order by Name</button>
                <button onClick={orderByForce}>Order by Force</button>

                <button onClick={() => setPage(page - 1)}>Previous</button>
                <button onClick={() => setPage(page + 1)}>Next</button>

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
