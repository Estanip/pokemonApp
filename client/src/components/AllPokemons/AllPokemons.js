import React from 'react'
import { connect } from 'react-redux';

import { orderByName } from '../../actions';
import './AllPokemons.css';

function AllPokemons({ orderByName }) {

    return (
        <div className='btn-allcontainer'>
            <button onClick={() => orderByName("ascendent")}>All Pokemons</button>
        </div>

    )
}

const mapDispatchToProps = (dispatch) => {

    return {
        orderByName: (order) => dispatch(orderByName(order))
    }
};

export default connect(null, mapDispatchToProps)(AllPokemons);