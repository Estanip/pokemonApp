import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { getPokemonsByType, getTypes } from '../../actions';
import Select from 'react-select';
import './SearchByType.css';


function SearchBy({ getPokemonsByType, types, getTypes, pokemons }) {

    const [inputSearch, setInput] = useState("");

    const customStyles = {
        container: (provided, state) => ({
            ...provided,
            width: state.selectProps.width,
            marginLeft: state.selectProps.marginLeft
        }),

        menu: (provided, state) => ({
            ...provided,
            borderBottom: '1px dotted pink',
            color: state.selectProps.menuColor,
        }),

        singleValue: (provided, state) => {
            const opacity = state.isDisabled ? 0.5 : 1;
            const transition = 'opacity 300ms';

            return { ...provided, opacity, transition };
        }
    }

    let typesOption = [];
    types.map(e => typesOption.push({ value: e.id, label: e.name }))


    const handleOnClick = (e) => {
        e.preventDefault();
        const search = async () => {

            if (inputSearch === "") {
                toast.warn("No se ingreso un tipo")
            }

            let resultType = pokemons.filter(e => e.types.includes(inputSearch))

            if (resultType.length === 0) {
                toast.warn("No existen pokemons con ese tipo")
            } else {
                getPokemonsByType(inputSearch)
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
        <div className='searchByType-container' >
            <form
                className="searchByType__form-container"
                onSubmit={(e) => handleOnClick(e)}>

                <div className='select__container'>
                    <Select
                        styles={customStyles}
                        width="400px"
                        menuColor='#3B4CCA'
                        name='tipos'
                        options={typesOption}
                        onChange={(e) => setInput(e.label)}
                        required
                    />
                </div>
                <div className='btnSearchByType__container'>
                    <button
                        type='submit'>
                        Search By Type
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
        getPokemonsByType: (type) => dispatch(getPokemonsByType(type)),
        getTypes: () => dispatch(getTypes())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBy)