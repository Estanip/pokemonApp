const { Tipo } = require('../db');
const axios = require('axios');

const createTypes = async (req, res) => {

    try {

        let apiTypes;
        let dbTypeNames;

        apiTypes = await axios.get('https://pokeapi.co/api/v2/type');

        const apiTypesResults = apiTypes.data.results;

        var typeNames = apiTypesResults.map((e) => {
            var newObj = {};
            newObj["name"] = e.name;
            return newObj;
        });

        try {
            dbTypeNames = await Tipo.bulkCreate(typeNames);
        } catch (err) {
            console.log("Creating DB")
        }

        return res.status(200).json({
            data: dbTypeNames
        })

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
        } catch(err) {
            console.log("Saving on DB")
        }

        types = await Tipo.findAll();

        return res.status(200).json({
            data: types
        })

    } catch (err) {
        return res.status(400).json({
            error: err
        })
    }
};

module.exports = { getByType, createTypes };