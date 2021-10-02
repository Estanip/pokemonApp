import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { getPokemonByName, getPokemonsByType, getTypes } from '../../actions';
import './SearchBy.css';


function SearchBy({ getPokemonsByType, getPokemonByName, types, getTypes, pokemons }) {

    const [inputSearch, setInput] = useState("");
    const [searchBy, setSearchBy] = useState("byName");

    const handleOnClick = (e) => {

        e.preventDefault();

        const search = async () => {


            if (searchBy === "byType") {
                try {

                    if (inputSearch === "") {
                        toast.warn("No se ingreso un tipo")
                    }

                    const result = types.filter(e => e.name.includes(inputSearch.toLocaleLowerCase()))

                    if (result.length > 0) {
                        getPokemonsByType(inputSearch.toLowerCase())
                    } else {
                        toast.warn("Tipo inexistente")
                    }
                } catch (err) {
                    toast.warn("Error en la consulta")
                }
            }


            if (searchBy === "byName") {
                try {
                    if (inputSearch === "") {
                        toast.warn("No se ingreso un nombre")
                    } else {
                        getPokemonByName(inputSearch.toLowerCase())
                    }
                } catch (err) {
                    console.log("Error en la consulta")
                }
            }
        }

        search();

    };

    useEffect(() => {

        const gettingTypes = async () => {
            await getTypes()
        }

        gettingTypes()

    }, [])

    return (
        <div className='search-container' >
            <form onSubmit={(e) => handleOnClick(e)}>

                <div className='select__container'>
                    <select className='search__select' name="searchBy" onChange={(e) => setSearchBy(e.target.value)}>
                        <option value="byName">By Name</option>
                        <option value="byType">By Type</option>
                    </select>
                </div>
                <div className='input__container'>
                    <input
                        className='text__input'
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={searchBy === "byType" ? "Ingresa Tipo" : "Ingresa Nombre"}
                    />
                </div>
                <div className='btn__container'>
                    <button type='submit'>
                        {searchBy === "byType" ? "Busca por Tipo" : "Busca Por Nombre"}
                    </button>

                </div>
            </form>

        </div>

    )
}


const mapStateToProps = (state) => {
    return {
        types: state.types,
        pokemons: state.pokemons
    }
}

const mapDispatchToProps = (dispatch) => {

    return {
        getPokemonByName: (name) => dispatch(getPokemonByName(name)),
        getPokemonsByType: (type) => dispatch(getPokemonsByType(type)),
        getTypes: () => dispatch(getTypes())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBy)