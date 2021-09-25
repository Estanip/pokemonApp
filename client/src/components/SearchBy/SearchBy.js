import React, { useState } from 'react'
import { connect } from 'react-redux';
import { getPokemonByName, getPokemonsByType } from '../../actions';


function SearchBy({getPokemonsByType, getPokemonByName}) {

    const [inputSearch, setInput] = useState("");
    const [searchBy, setSearchBy] = useState("byName");

    const handleOnClick = (e) => {
        e.preventDefault()
        const search = async () => {
            if (searchBy === "byType") {
                await getPokemonsByType(inputSearch)
            }
            if (searchBy === "byName") {
               await getPokemonByName(inputSearch)
            }
        }

        search();

        console.log("inputSearch", inputSearch)
        console.log("searchBy", searchBy)

    }

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
                />
                <button type='submit' >
                    {searchBy === "byType" ? "Busca por Tipo" : "Busca Por Nombre"}
                </button>
            </form>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {

    return {
        getPokemonByName: (name) => dispatch(getPokemonByName(name)),
        getPokemonsByType: (type) => dispatch(getPokemonsByType(type)),
    }
};

export default connect(null, mapDispatchToProps)(SearchBy)