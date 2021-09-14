const { Pokemon } = require('../db');
const axios = require('axios');

const getPokemons = async (req, res) => {
    try {
        const { name } = req.query;

        if (!name) {
            const pokemons = await axios.get('https://pokeapi.co/api/v2/pokemon');
            return res.status(200).json({
                data: pokemons.data.results
            })
        } else {
            let apiName = "";
            let dbName = "";

            try {
                apiName = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
            }
            catch (err) {
                console.log("Searching")
            }

            try {
                dbName = await Pokemon.findAll({
                    where: {
                        name
                    }
                })
            } catch (err) {
                console.log("Searching")
            }

            if (apiName != "") {
                return res.status(200).json({
                    data: apiName.data.abilities
                });
            }

            if (dbName != "") {
                return res.status(200).json({
                    data: dbName
                })
            } else {
                return res.status(400).json({
                    message: "No existen pokemones con ese nombre"
                })
            }
        }
    } catch (err) {
        return res.status(404).json({
            error: err
        })
    }
};

const getById = async (req, res) => {
    try {
        const { id } = req.params;

        const idVer = id.includes('-');

        if (idVer === true) {
            const dbPok = await Pokemon.findAll({
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
        return res.status(400).json({
            error: err
        })
    }
};

const createPokemon = async (req, res) => {

    try {

        const pokemon = req.body;

        const newPokemon = await Pokemon.create(pokemon);

        return res.status(200).json({
            data: newPokemon
        })
    } catch (err) {
        return res.status(400).json({
            error: err
        })
    }
};

module.exports = { getPokemons, getById, createPokemon };