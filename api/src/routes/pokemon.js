const { Router } = require('express');
const { getById, createPokemon, getFiltPokemon, getPokemonsByName, orderByName, orderByForce } = require('../controllers/pokemon.controller');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

// find all or by name
router.get('/', getPokemonsByName);

// filter pokemon name, types and image
router.get('/filter', getFiltPokemon);

// order by name
router.get('/orderbyname', orderByName);

// order by force
router.get('/orderbyforce', orderByForce);

// find by id
router.get('/:id', getById);

// create a new Pokemon in DB
router.post('/', createPokemon);


module.exports = router;
