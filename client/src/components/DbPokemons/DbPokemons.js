import React, {useState} from 'react'
import { connect } from 'react-redux';
import { getDbPokemons } from '../../actions';

function DbPokemons({getDbPokemons}) {

    const [message, setMessage] = useState("");

    const getPok = async (e) => {
        e.preventDefault()
        const result = await getDbPokemons();
        if(result.data.length === 0) {
            setMessage("No se encontraron Pokemons en la DB")
        }

        setTimeout(() => {
           setMessage("") 
        }, 3000);
    }

    return (
        <div>
            <button onClick={(e) => getPok(e)}>DB Pokemons</button> {message}
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {

    return {
        getDbPokemons: () => dispatch(getDbPokemons())
    }
};

export default connect(null, mapDispatchToProps)(DbPokemons);