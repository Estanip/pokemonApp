const { Router } = require('express');
const { getPokemonById, createPokemon, getFiltPokemon, getPokemonsByName, orderPokemonByName, getDbPokemons, orderPokemonByForce } = require('../controllers/pokemon.controller');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

// find all or by name
router.get('/', getPokemonsByName);

// get pokemons from DB
router.get('/db', getDbPokemons);

// filter pokemon name, types and image
router.get('/filter', getFiltPokemon);

// order by name
router.get('/orderbyname', orderPokemonByName);

// order by force
router.get('/orderByForce', orderPokemonByForce);

// find by id
router.get('/:id', getPokemonById);

// create a new Pokemon in DB
router.post('/', createPokemon);


module.exports = router;
