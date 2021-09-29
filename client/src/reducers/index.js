const initialState = {
    pokemons: [],
    pokemonsCopy: [],
    pokemon: [],
    types: []
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_POKEMONS':
            return {
                ...state,
                pokemons: action.data,
                pokemonsCopy: action.data
            }
        case 'GET_TYPES':
            return {
                ...state,
                types: action.data
            }
        case 'GET_DB_POKEMONS':
            let pokemonsList = [...state.pokemonsCopy]
            if (action.data.length === 0) {
                return {
                    ...state,
                    pokemons: pokemonsList
                }
            } else {
                return {
                    ...state,
                    pokemons: action.data
                }
            }

        case 'GET_POKEMON_BY_NAME':
            let pokemonsName = [...state.pokemonsCopy]
            let result = pokemonsName.filter(e => e.name.includes(action.payload))
            if (action.payload === "") {
                return {
                    ...state,
                    pokemons: pokemonsName
                }

            }
            if (result.length === 0) {
                return {
                    ...state,
                    pokemons: pokemonsName
                }
            }
            else {
                return {
                    ...state,
                    pokemons: result
                }
            }
        case 'GET_POKEMON_BY_ID':
            return {
                ...state,
                pokemon: action.data
            }
        case 'GET_POKEMONS_BY_TYPE':
            let pokemonsTypes = [...state.pokemonsCopy]
            if (action.payload === "") {
                return {
                    ...state,
                    pokemons: pokemonsTypes
                }
            } else {
                return {
                    ...state,
                    pokemons: pokemonsTypes.filter(e => e.types.includes(action.payload))
                }
            }
        case 'ORDER_BY_NAME':
            let pokemonsByName = [...state.pokemonsCopy]
            function sortOn(arr, prop) {
                arr.sort(
                    function (a, b) {
                        if (a[prop] < b[prop]) {
                            return -1;
                        } else if (a[prop] > b[prop]) {
                            return 1;
                        } else {
                            return 0;
                        }
                    }
                );
            }
            sortOn(pokemonsByName, "name");
            if (action.payload === "ascendent") {
                return {
                    ...state,
                    pokemons: pokemonsByName
                }
            } else if (action.payload === "descendent") {
                return {
                    ...state,
                    pokemons: pokemonsByName.reverse()
                }
            }
        case 'ORDER_BY_FORCE':
            let pokemonsByForce = [...state.pokemonsCopy]
            sortOn(pokemonsByForce, "force");
            if (action.payload === "ascendent") {
                return {
                    ...state,
                    pokemons: pokemonsByForce
                }
            } else if (action.payload === "descendent") {
                return {
                    ...state,
                    pokemons: pokemonsByForce.reverse()
                }
            }
        case 'CREATE_POKEMON':
            return {
                ...state,
                pokemons: state.pokemons.push(action.payload)
            }
        default:
            return state;
    }
}

export default rootReducer;