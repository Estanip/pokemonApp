const { Router } = require('express');
const axios = require('axios');
const { Pokemons } = require('../db.js');
const { conn } = require('../db.js');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/pokemons', async (req, res) => {
    try {
        const pokemons = await axios.get('https://pokeapi.co/api/v2/pokemon'); return res.status(200).json({
            data: pokemons.data.results
        })
    } catch (err) {
        res.status(400).json({
            error: err
        })
    }
});

router.get('/pokemons/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const idVer = id.includes('-');

        if (idVer === true) {
            const dbPok = await Pokemons.findAll({
                where: {
                    id
                }
            });

            return res.status(200).json({
                data: dbPok
            });
        } else {

            const apiPok = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);

            return res.status(200).json({
                data: apiPok.data.species
            });
        }

    } catch (err) {
        res.status(400).json({
            error: err
        })
    }
});

module.exports = router;
