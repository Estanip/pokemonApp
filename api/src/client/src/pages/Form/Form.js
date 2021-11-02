import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { createPokemon, getPokemons, getTypes } from '../../actions';
import routes from '../../helpers/routes';
import './Form.css'
import { toast } from 'react-toastify';
import pokebola from '../../assets/images/pokebola.png';


function Form({ createPokemon, getTypes, types, getPokemons, pokemons }) {

    const initialState = ({
        name: "",
        life: 0,
        attack: 0,
        defense: 0,
        speed: 0,
        height: 0,
        weight: 0,
        types: [],
        image: []
    });

    const [pokemon, setPokemon] = useState(initialState);
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
          padding: 20
        }),
      
        singleValue: (provided, state) => {
          const opacity = state.isDisabled ? 0.5 : 1;
          const transition = 'opacity 300ms';
      
          return { ...provided, opacity, transition };
        }
      }
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

    const handleInputImage = (e) => {

        let file = e.target.files[0];
        let reader = new FileReader();

        reader.onload = (event) => {
            let img = event.target.result
            setPokemon({
                ...pokemon,
                image: img
            })
        }

        reader.readAsDataURL(file);
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        let result = pokemons.filter(e => e.name.includes(pokemon.name))

        if (pokemon.types.length === 0) {
            toast.warn("No se ha seleccionado ningun tipo");
            return;
        }
        if (pokemon.types.length > 2) {
            toast.warn("No se puede seleccionar mas de dos tipos");
            return;
        } if (result.length > 0) {
            toast.warn("Ya existe un pokemon con ese nombre")
        } if(pokemon.image.length === 0) {
            toast.warn("No se ha seleccionado una imagen")
        } else {
            createPokemon(pokemon)
            history.push(routes.home)

        }
    };

    useEffect(() => {
        getPokemons();
        getTypes();
    }, []);

    return (
        <div className="create-container">
            <div className='form-container'>

            <div className="img-container">
                <img src={pokebola} alt="Pokebola"></img>
            </div> 

         <form onSubmit={(e) => handleSubmit(e)}>

                    <div className="input-container">
                        <label>Name</label>
                        <input type="text" name='name' onChange={(e) => handleOnChange(e)} required />
                    </div>

                    <div className="input-container">
                        <label>Life</label>
                        <input type="number" name="life" onChange={(e) => handleOnChange(e)} min="1" max="100" required />
                    </div>

                    <div className="input-container">
                        <label>Attack</label>
                        <input type="number" name="attack" onChange={(e) => handleOnChange(e)} min="1" max="100" required />
                    </div>

                    <div className="input-container">
                        <label>Defense</label>
                        <input type="number" name="defense" onChange={(e) => handleOnChange(e)} min="1" max="100" required />
                    </div>

                    <div className="input-container">
                        <label>Speed</label>
                        <input type="number" name="speed" onChange={(e) => handleOnChange(e)} min="1" max="100" required />
                    </div>

                    <div className="input-container">
                        <label>Height</label>
                        <input type="number" name="height" onChange={(e) => handleOnChange(e)} min="1" max="100" required />
                    </div>


                    <div className="input-container">
                        <label>Weight</label>
                        <input type="number" name="weight" onChange={(e) => handleOnChange(e)} min="1" max="100" required />
                    </div>

                    <div className="input-imgContainer">
                        <label>Seleccionar Imagen
                        <input type="file"
                            accept="image/jpg, image/png, image/jpeg"
                            className="file__input"
                            onChange={(e) => handleInputImage(e)}
                        />
                        </label>

                    </div>


                    <div className='select__container'>
                        <label>Types</label>
                        <Select
                            styles={customStyles}
                            width="70%"
                            marginLeft="-8px"
                            menuColor='red'
                            isMulti
                            name='tipos'
                            options={typesOption}
                            onChange={(e) => handleChangeCheck(e)}
                            required
                        />
                    </div>

                    <div className="btn-container">
                        <button type="submit">Create</button>
                        <Link to to={routes.home}>
                            <button >Regresar</button>
                        </Link>
                    </div>

                </form>
            </div >
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
        getPokemons: () => dispatch(getPokemons()),
        getTypes: () => dispatch(getTypes())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form)