const { Router } = require('express');
const { getPokemonById, createPokemon, getPokemons, getPokemonsByName, getDbPokemons, getApiPokemons } = require('../controllers/pokemon.controller');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

// get all pokemons (API + DB) filter pokemon name, types and image
router.get('/all', getPokemons);

// get pokemons from DB
router.get('/db', getDbPokemons);

// get pokemons from API
router.get('/api', getApiPokemons);

// find by name
router.get('/', getPokemonsByName);

// find by id
router.get('/:id', getPokemonById);

// create a new Pokemon in DB
router.post('/', createPokemon);


module.exports = router;