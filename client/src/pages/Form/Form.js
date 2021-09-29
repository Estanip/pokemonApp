import React, { useState, useEffect } from 'react';
import Multi from 'react-select';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { createPokemon, getPokemons, getTypes } from '../../actions';
import routes from '../../helpers/routes';
import './Form.css'


function Form({ createPokemon, getTypes, types, getPokemons, pokemons }) {

    const initialState = ({
        name: "",
        life: 0,
        attack: 0,
        defense: 0,
        speed: 0,
        height: 0,
        weight: 0,
        types: []
    });

    const [pokemon, setPokemon] = useState(initialState);
    const [message, setMessage] = useState("");

    let history = useHistory();
    let typesOption = [];
    types.map(e => typesOption.push({ value: e.id, label: e.name }))

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setPokemon({
            ...pokemon,
            [name]: value.toLowerCase()
        })
    };

    const handleChangeCheck = (e) => {
        let type = [];
        e.map(item => type.push((item.value).toString()))
        setPokemon({
            ...pokemon,
            types: type
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        let result = pokemons.filter(e => e.name.includes(pokemon.name))

        if (pokemon.types.length === 0) {
            setMessage("No se ha seleccionado ningun tipo");
            return;
        }
        if (pokemon.types.length > 2) {
            setMessage("No se puede seleccionar mas de dos tipos");
            return;
        } if (result.length > 0) {
            setMessage("Ya existe un pokemon con ese nombre")
        } else {
            createPokemon(pokemon)
            history.push(routes.home)

        }

        setTimeout(() => {
            setMessage("")
        }, 2000);
    };

    useEffect(() => {
        getPokemons();
        getTypes();
    }, []);

    return (
        <div className='form-container'>
            <div className='title__container'>
                <h1>Crea tu Pokemon!</h1>
            </div>

            <form onSubmit={(e) => handleSubmit(e)}>

                <input type="text" name='name' onChange={(e) => handleOnChange(e)} placeholder='Insert name' required />

                <input type="number" name="life" onChange={(e) => handleOnChange(e)} placeholder='Insert life' min="1" max="100" required />

                <input type="number" name="attack" onChange={(e) => handleOnChange(e)} placeholder='Insert attack' min="1" max="100" required />


                <input type="number" name="defense" onChange={(e) => handleOnChange(e)} placeholder='Insert defense' min="1" max="100" required />


                <input type="number" name="speed" onChange={(e) => handleOnChange(e)} placeholder='Insert speed' min="1" max="100" required />


                <input type="number" name="height" onChange={(e) => handleOnChange(e)} placeholder='Insert height' min="1" max="100" required />

                <input type="number" name="weight" onChange={(e) => handleOnChange(e)} placeholder='Insert Weight' min="1" max="100" required />

                <div className='select__container'>
                    <Multi
                        className='select_types'
                        isMulti name='tipos'
                        closeMenuOnSelect={false}
                        options={typesOption}
                        onChange={(e) => handleChangeCheck(e)}
                        required
                    /> <span>{message}</span>
                </div>

                <button className='form__btn' type="submit">Create</button>
                <Link to to={routes.home}>
                    <button className="form__btn">Regresar</button>
                </Link>
            </form>
        </div >
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
        getPokemons: () => dispatch(getPokemons()),
        getTypes: () => dispatch(getTypes())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form)