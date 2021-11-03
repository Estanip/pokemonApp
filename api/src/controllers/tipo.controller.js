const { Tipo } = require('../db');
const axios = require('axios');

const createTypes = async (req, res) => {

    try {

        let apiTypes;
        let dbTypeNames;

        let pokemonsDb = await Tipo.findAll();

        if (pokemonsDb.length === 0) {

            // get all pokemons types from API
            apiTypes = await axios.get('https://pokeapi.co/api/v2/type');

            const apiTypesResults = apiTypes.data.results;

            // get just the names of all types
            var typeNames = apiTypesResults.map((e) => {
                var newObj = {};
                newObj["name"] = e.name;
                return newObj;
            });

            try {
                dbTypeNames = await Tipo.bulkCreate(typeNames);
            } catch (err) {
                console.log("Can not create Type")
            }

            return res.status(200).json(dbTypeNames)

        }

        return res.status(200).json(pokemonsDb)
    }
    catch (err) {
        res.status(400).json({
            error: err
        })
    }

};

const getByType = async (req, res) => {

    try {

        let types;

        try {
            await createTypes();
        } catch (err) {
            console.log("Type can not be saved")
        }

        types = await Tipo.findAll();

        return res.status(200).json(types)

    } catch (err) {
        return res.status(400).json({
            error: err
        })
    }
};

module.exports = { getByType, createTypes };