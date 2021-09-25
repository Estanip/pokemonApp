const initialState = {
    pokemons: [],
    pokemonsLoaded: [],
    pokemon: [],
    types: []
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_POKEMONS':
            return {
                ...state,
                pokemons: action.data,
                pokemonsLoaded: action.data        
            }
        case 'GET_TYPES':
            return {
                ...state,
                types: action.data
            }
        case 'GET_DB_POKEMONS':
            return {
                ...state,
                pokemons: action.data
            }
        case 'GET_POKEMON_BY_NAME':
            return {
                ...state,
                pokemons: [action.data]
            }
        case 'GET_POKEMON_BY_ID':
            return {
                ...state,
                pokemon: action.data
            }
        case 'GET_POKEMONS_BY_TYPE':
          let pokemonsList = [...state.pokemonsLoaded]
            return {
                ...state,
                pokemons: pokemonsList.filter(e => e.types.includes(action.payload))
            }
        case 'GET_POKEMONS_ORDER_BY_NAME':
            if(action.payload === "ascendent") {
                return {
                    ...state,
                    pokemons: action.data   
                }
            } else if(action.payload === "descendent") {
                return {
                    ...state,
                    pokemons: action.data.reverse()
                }
            }
        case 'GET_POKEMONS_ORDER_BY_FORCE':
            if(action.payload === "ascendent") {
                return {
                    ...state,
                    pokemons: action.data.reverse()
                }
            } else if(action.payload === "descendent") {
                return {
                    ...state,
                    pokemons: action.data
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