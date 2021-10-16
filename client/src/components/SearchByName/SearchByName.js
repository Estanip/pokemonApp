import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { getPokemonByName } from '../../actions';
import './SearchByName.css';


function SearchBy({ getPokemonByName, pokemons }) {

    const [inputSearch, setInput] = useState("");

    const handleOnClick = (e) => {

        e.preventDefault();

        const search = async () => {

            if (inputSearch === "") {
                toast.warn("No se ingreso un nombre")
            }

            let resultName = pokemons.filter(e => e.name.includes(inputSearch.toLocaleLowerCase()))

            if (resultName.length === 0 && inputSearch !== "") {
                toast.warn("No se encontraron pokemons con ese nombre")
                setInput("")
            }
            else {
                getPokemonByName(inputSearch.toLowerCase())
                setInput("")
            }
        }

        search();
    };

    return (
        <div className='search-container' >
            <form
                className="search__form-container"
                onSubmit={(e) => handleOnClick(e)}>
                <div className='input__container'>
                    <input
                        value={inputSearch}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Insert Name..."
                    />
                </div>
                <div className='btnSearch__container'>
                    <button
                        type='submit'>
                        Search By Name
                    </button>
                </div>
            </form>
        </div>

    )
}


const mapStateToProps = (state) => {
    return {
        pokemons: state.pokemons
    }
}

const mapDispatchToProps = (dispatch) => {

    return {
        getPokemonByName: (name) => dispatch(getPokemonByName(name)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBy)