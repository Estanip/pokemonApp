import React, { useState } from 'react'
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { getDbPokemons } from '../../actions';
import './DbPokemons.css';

function DbPokemons({ getDbPokemons }) {

    const getPok = async (e) => {
        e.preventDefault()
        const result = await getDbPokemons();
        if (result.data.length === 0) {
            toast.warn("No existen Pokemons en la DB")
        };
    }

    return (
        <div className='btn-dbcontainer'>
            <button onClick={(e) => getPok(e)}>My Pokemons</button>
        </div>

    )
}

const mapDispatchToProps = (dispatch) => {

    return {
        getDbPokemons: () => dispatch(getDbPokemons())
    }
};

export default connect(null, mapDispatchToProps)(DbPokemons);