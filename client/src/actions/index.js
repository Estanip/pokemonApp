import axios from 'axios';

const local = "http://localhost:3008";
const prod = "https://pokemonappapi2.herokuapp.com";

export function getPokemons() {
    return async function (dispatch) {
        try {
            const apiPok = await axios.get(`${prod}/pokemons/all`);
            const pokemonList = apiPok.data;
            return dispatch({
                type: 'GET_POKEMONS',
                data: pokemonList
            })
        } catch (err) {
            console.log(err)
        }
    }
};

export function getDbPokemons() {
    return async function (dispatch) {
        try {
            const pokemons = await axios.get(`${prod}/pokemons/db`);
            return dispatch({
                type: 'GET_DB_POKEMONS',
                data: pokemons.data
            })
        } catch (err) {
            console.log(err)
        }
    }
};

export function getPokemonById(id) {
    return async function (dispatch) {
        try {
            const result = await axios.get(`${prod}/pokemons/${id}`);
            return dispatch({
                type: 'GET_POKEMON_BY_ID',
                data: result.data,
                payload: id
            })
        } catch (err) {
            console.log(err)
        }
    }
};

export function getPokemonByName(name) {
    return {
        type: 'GET_POKEMON_BY_NAME',
        payload: name
    }
};

export function getPokemonsByType(type) {
    return {
        type: 'GET_POKEMONS_BY_TYPE',
        payload: type
    }
};

export function getTypes() {
    return async function (dispatch) {
        try {
            const results = await axios.get(`${prod}/types`);
            return dispatch({
                type: 'GET_TYPES',
                data: results.data
            })
        } catch (err) {
            console.log(err)
        }
    }
};

export function createPokemon(data) {
    return async function (dispatch) {
        const newPokemon = await axios.post(`${prod}/pokemons/`, data)
        return dispatch({
            type: 'CREATE_POKEMON',
            data: newPokemon,
            payload: data
        })
    }
};

export function orderByName(order) {
    return {
        type: 'ORDER_BY_NAME',
        payload: order
    }
};

export function orderByForce(order) {
    return {
        type: 'ORDER_BY_FORCE',
        payload: order
    }
};