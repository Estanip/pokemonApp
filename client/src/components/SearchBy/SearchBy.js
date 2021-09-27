import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { getPokemonByName, getPokemonsByType, getTypes } from '../../actions';


function SearchBy({ getPokemonsByType, getPokemonByName, types, getTypes, pokemons }) {

    const [inputSearch, setInput] = useState("");
    const [searchBy, setSearchBy] = useState("byName");
    const [message, setMessage] = useState("");

    const handleOnClick = (e) => {

        e.preventDefault();

        const search = async () => {


            if (searchBy === "byType") {
                try {

                    if (inputSearch === "") {
                        setMessage("No se ingreso un tipo correctamente")
                    }

                    const result = types.filter(e => e.name.includes(inputSearch.toLocaleLowerCase()))

                    if (result.length > 0) {
                        getPokemonsByType(inputSearch.toLowerCase())
                    } else {
                        setMessage("Tipo inexistente")
                    }
                } catch (err) {
                    setMessage("Error en la consulta")
                }
            }


            if (searchBy === "byName") {
                try {
                    if (inputSearch === "") {
                        setMessage("No se ingreso un nombre correctamente")
                    } else {
                        getPokemonByName(inputSearch.toLowerCase())
                    }
                } catch (err) {
                    console.log("Error en la consulta")
                }
            }
        }

        search();

        setTimeout(() => {
            setMessage("");
        }, 3000);

    };

    useEffect(() => {

        const gettingTypes = async () => {
            await getTypes()
        }

        gettingTypes()

    }, [])

    return (
        <div>
            <form onSubmit={(e) => handleOnClick(e)}>
                <select name="searchBy" onChange={(e) => setSearchBy(e.target.value)}>
                    <option value="byName">By Name</option>
                    <option value="byType">By Type</option>
                </select>

                { }
                <input onChange={(e) => setInput(e.target.value)}
                    placeholder={searchBy === "byType" ? "Ingresa Tipo" : "Ingresa Nombre"}
                /> {message}
                <button type='submit' >
                    {searchBy === "byType" ? "Busca por Tipo" : "Busca Por Nombre"}
                </button>
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