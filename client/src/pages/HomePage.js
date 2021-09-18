import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function HomePage() {

    const [pokemons, setPokemons] = useState([]);
    const [inputSearch, setInput] = useState("");

    const getPokemons = async () => {

        const result = await axios.get('http://localhost:3001/pokemons/filter');
        console.log(result)
    }

    const getPokemonByName = async () => {
        const result = await axios.get(`http://localhost:3001/pokemons?name=${inputSearch}`)
        const pokemonByName = result.data.data;
        console.log("pokemonBy", pokemonByName.height)
    }

    const handleOnChange = (e) => {
        const { value } = e.target;
        setInput(value)
    }

    useEffect(() => {
        getPokemons()
    }, [])


    return (
        <div>
            <h1>Home</h1>
            <div>
                <input onChange={handleOnChange} name="inputName" placeholder="Busca Tu Pokemon" />
                <button onClick={getPokemonByName} >Search!</button>

            </div>
            <table>
                <thead>
                    <td>Name</td>
                    <td>Types</td>
                    <td>Image</td>
                </thead>
                <tbody>
                    {pokemons.map(pokemon => (
                        <tr>{pokemon.name}</tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
