const { Router } = require('express');
const { getById, getPokemons, createPokemon, getFiltPokemon } = require('../controllers/pokemon.controller');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

// find all or by name
router.get('/', getPokemons);

// filter pokemon name, types and image
router.get('/filter', getFiltPokemon);

// find by id
router.get('/:id', getById);

// create a new Pokemon in DB
router.post('/', createPokemon);

module.exports = router;
