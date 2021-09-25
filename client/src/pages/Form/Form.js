import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createPokemon, getTypes } from '../../actions';
import routes from '../../helpers/routes';
import './Form.css'


function Form({ pokemons, createPokemon, getTypes, types }) {

    const initialState = ({
        name: "",
        life: 0,
        attack: 0,
        defense: 0,
        speed: 0,
        height: 0,
        weight: 0
    });

    const [pokemon, setPokemon] = useState(initialState);
    const [pokemonTypes, setPokemonTypes] = useState({ types: [] });

    let history = useHistory();

    const handleOnChange = (e) => {

        const { name, value } = e.target;

        setPokemon({
            ...pokemon,
            [name]: value
        })

    };

    const handleSubmit = () => {
    
        let pok = { ...pokemon, ...pokemonTypes };
        createPokemon(pok)
        history.push(routes.home)
    };

    useEffect(() => {
        getTypes()
    }, []);

    return (
        <div className='formContainer'>

            <h2>Diseña tu Pokemon!</h2>

            <form className='form' onSubmit={handleSubmit}>

                <input type="text" name="name" onChange={handleOnChange} placeholder='Pokemon Name'/>

                <input type="number" name="life" onChange={handleOnChange} placeholder='Life'/>  
            
                <input type="number" name="attack" onChange={handleOnChange} placeholder='Attack'/>

                <input type="number" name="defense" onChange={handleOnChange}  placeholder='Defense'/>

                <input type="number" name="speed" onChange={handleOnChange} placeholder='Speed' />

                <input type="number" name="height" onChange={handleOnChange} placeholder='Height'/>

                <input type="number" name="weight" onChange={handleOnChange} placeholder='Weight' />

                <label>Tipo/s</label>
                <div id="checkboxes" onChange={(e) => setPokemonTypes({ types: [...pokemonTypes.types, e.target.value] })}>
 Tipos
                    <ul>
                        {types.map(e => (
                            <li><input type="checkbox" value={e.name} />{e.name}</li>

                        ))}
                    </ul>
                </div>

                <button type="submit">Guardar Pokemon</button>

            </form>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        pokemons: state.pokemons,
        types: state.types
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createPokemon: (data) => dispatch(createPokemon(data)),
        getTypes: () => dispatch(getTypes())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form)