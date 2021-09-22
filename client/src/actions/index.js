import axios from 'axios';

export function getPokemons() {
    return async function (dispatch) {
        const result = await axios.get('http://localhost:3001/pokemons/filter');
        const pokemonList = result.data.data;
        return dispatch({
            type: 'GET_POKEMONS',
            data: pokemonList
        })
    }
};

export function getOrderByName(order) {
    return async function (dispatch) {
        const result = await axios.get('http://localhost:3001/pokemons/orderbyname');
        const pokByName = result.data.data;
        return dispatch({
            type: 'GET_POKEMONS_ORDER_BY_NAME',
            data: pokByName,
            payload: order
        })
    }
};

export function getOrderByWeight(order) {
    return async function (dispatch) {
        const result = await axios.get('http://localhost:3001/pokemons/orderbyweight');
        const pokByWeight = result.data.data;
        return dispatch({
            type: 'GET_POKEMONS_ORDER_BY__WEIGHT',
            data: pokByWeight,
            payload: order
        })
    }
};

export function getPokemonByName(name) {
    return async function (dispatch) {
        const result = await axios.get(`http://localhost:3001/pokemons?name=${name}`)
        const pokemon = result.data.data;
        return dispatch({
            type: 'GET_POKEMON_BY_NAME',
            data: pokemon,
            payload: name
        })
    }
};

export function getPokemonsByType(type) {
    return {
        type: 'GET_POKEMONS_BY_TYPE',
        payload: type
    }
};