import React, { useState } from 'react'
import { connect } from 'react-redux';
import { getDbPokemons } from '../../actions';
import './DbPokemons.css';

function DbPokemons({ getDbPokemons }) {

    const [message, setMessage] = useState("");

    const getPok = async (e) => {
        e.preventDefault()
        const result = await getDbPokemons();
        if (result.data.length === 0) {
            setMessage("DB Vacia")
        }

        setTimeout(() => {
            setMessage("")
        }, 3000);
    }

    return (
        <div className='btn-dbcontainer'>
            <button onClick={(e) => getPok(e)}>DB Pokemons</button>
            <span>{message}</span>
        </div>

    )
}

const mapDispatchToProps = (dispatch) => {

    return {
        getDbPokemons: () => dispatch(getDbPokemons())
    }
};

export default connect(null, mapDispatchToProps)(DbPokemons);