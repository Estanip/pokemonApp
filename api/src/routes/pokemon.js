const { Router } = require('express');
const { getById, getPokemons, createPokemon, getPokemon } = require('../controllers/pokemon.controller');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

// search all or by name
router.get('/', getPokemons);

router.get('/pokemon', getPokemon);

// search by id
router.get('/:id', getById);

// create a new Pokemon in DB
router.post('/', createPokemon);

module.exports = router;
