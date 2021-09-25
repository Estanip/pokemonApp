import axios from 'axios';

export function getPokemons() {
    return async function (dispatch) {
        const result = await axios.get('http://localhost:3001/pokemons/filter');
        const pokemonList = result.data
        return dispatch({
            type: 'GET_POKEMONS',
            data: pokemonList
        })
    }
};

export function getDbPokemons() {
    return async function(dispatch) {
        const pokemons = await axios.get('http://localhost:3001/pokemons/db');
        return dispatch({
            type: 'GET_DB_POKEMONS',
            data: pokemons.data
        })
    }
};

export function getPokemonById(id) {
    return async function(dispatch) {
        const result = await axios.get(`http://localhost:3001/pokemons/${id}`);
        return dispatch({
            type: 'GET_POKEMON_BY_ID',
            data: result.data,
            payload: id
        })
    }
};

export function getPokemonByName(name) {
    return async function (dispatch) {
        const result = await axios.get(`http://localhost:3001/pokemons?pokemonName=${name}`)
        const pokemon = result
        return dispatch({
            type: 'GET_POKEMON_BY_NAME',
            data: pokemon.data,
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

export function getOrderByName(order) {
    return async function (dispatch) {
        const result = await axios.get('http://localhost:3001/pokemons/orderbyname');
        const pokByName = result.data
        return dispatch({
            type: 'GET_POKEMONS_ORDER_BY_NAME',
            data: pokByName,
            payload: order
        })
    }
};

export function getOrderByForce(order) {
    return async function (dispatch) {
        const result = await axios.get('http://localhost:3001/pokemons/orderByForce');
        const pokByForce = result.data
        return dispatch({
            type: 'GET_POKEMONS_ORDER_BY_FORCE',
            data: pokByForce,
            payload: order
        })
    }
};

export function createPokemon(data) {
    return async function(dispatch) {
        const newPokemon = await axios.post('http://localhost:3001/pokemons', data)
        return dispatch({
            type: 'CREATE_POKEMON',
            data: newPokemon,
            payload: data
        })
    }
};

export function getTypes() {
    return async function(dispatch) {
        const results = await axios.get('http://localhost:3001/types');
        return dispatch({
            type: 'GET_TYPES',
            data: results.data
        })
    }
};

