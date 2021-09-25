const { Pokemon } = require('../db');
const axios = require('axios');

/* const getApiPokemons = async (req, res) => {
    // find all pokemons in API
    try {
        const p1 = await axios.get('https://pokeapi.co/api/v2/pokemon');
        const p2 = await axios.get('https://pokeapi.co/api/v2/pokemon?offset=20&limit=20');
        const promises = await Promise.all([p1, p2])
        const result = [...promises[0].data.results, ...promises[1].data.results]
        return res.status(200).json(result)
    } catch (err) {
        console.log("Searching Pokemons")
    }
}; */

const getDbPokemons = async (req, res) => {

    try {

        // search pokemons in DB
        const pokemons = await Pokemon.findAll();

        res.status(200).json(pokemons)

    } catch (err) {
        res.status(400).json({
            error: err
        })
    }
};

const getPokemonsByName = async (req, res) => {
    try {

        const { pokemonName } = req.query;

        if (!pokemonName) {
            return res.status(400).json({
                message: "No se ingreso ningun pokemon"
            })
        }

        // variables to validate
        let apiPok = "";
        let dbPok = "";
        let pokObj = [];

        // search in API
        try {
            apiPok = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
            const name = apiPok.data.name
            const image = apiPok.data.sprites.front_default
            const types = apiPok.data.types.map(pok => {
                return pok.type.name
            })
            const weight = apiPok.data.weight
            const id = apiPok.data.id
            pokObj = {
                id,
                name,
                image,
                weight,
                types
            }
        }
        catch (err) {
            console.log("Searching pokemons on API")
        }

        // search in DB
        try {
            dbPok = await Pokemon.findAll({
                where: {
                    pokemonName
                }
            })
        } catch (err) {
            console.log("Searching Pokemons on DB")
        }

        if (apiPok != "") {
            return res.status(200).json(pokObj);
        }

        if (dbPok != "") {
            return res.status(200).json(dbName)
        }

        return res.status(400).json({
            message: "No existen pokemones con ese nombre"
        })

    } catch (err) {
        return res.status(400).json({
            error: err
        })
    }
};

const getPokemonById = async (req, res) => {
    try {

        const { id } = req.params;

        // var to check if id model looks like xxxx-xxxx-xxx
        const idVer = id.includes('-');

        // if id has - search pokemon in DB, if not in de API
        if (idVer === true) {
            const dbPok = await Pokemon.findAll({
                where: {
                    id
                }
            });

            return res.status(200).json(dbPok);
        } else {

            const apiPok = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);

            return res.status(200).json(apiPok.data);
        }

    } catch (err) {
        return res.status(400).json({
            error: err
        })
    }
};

const getFiltPokemon = async (req, res) => {

    try {

        // array with all pokemon names
        let pokNames = [];

        // object filter to return
        let pokObj = [];
        /*     pokObj = [{
                name,
                types,
                image
            }]
         */

        // search in API to get the pokemons names        
        /*        const result = await axios.get('https://pokeapi.co/api/v2/pokemon'); */
        const p1 = await axios.get('https://pokeapi.co/api/v2/pokemon');
        const p2 = await axios.get('https://pokeapi.co/api/v2/pokemon?offset=20&limit=20');
        const promises = await Promise.all([p1, p2])
        const result = [...promises[0].data.results, ...promises[1].data.results]
        result.forEach(pokemon => {
            pokNames.push(pokemon.name)
        })

        // get object for each pokemon
        const results = await Promise.all(
            pokNames.map(async (name) => {
                return await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
            })
        );


        // create an object for each pokemon with name, types and image
        results.forEach(pok => {
            const image = pok.data.sprites.front_default;
            const types = pok.data.types.map(e => {
                return e.type.name;
            })
            const weight = pok.data.weight;
            const name = pok.data.name;
            const id = pok.data.id

            let obj = {
                id,
                name,
                image,
                types,
                weight
            }

            pokObj.push(obj)
        })

        return res.status(200).json(pokObj)

    } catch (err) {
        res.status(400).json({
            error: err
        })
    }
};

const createPokemon = async (req, res) => {

    try {

        const pokemon = req.body;

        // create a new instance of Pokemon
        const newPokemon = await Pokemon.create(pokemon);

        return res.status(200).json(newPokemon)

    } catch (err) {
        return res.status(400).json({
            error: err
        })
    }
};

const orderPokemonByName = async (req, res) => {

    try {

        // array with all pokemon names
        let pokNames = [];

        // object filter to return
        let pokObj = [];
        /*     pokObj = [{
                name,
                types,
                image
            }]
         */

        // search in API to get the pokemons names        
        /*        const result = await axios.get('https://pokeapi.co/api/v2/pokemon'); */
        const p1 = await axios.get('https://pokeapi.co/api/v2/pokemon');
        const p2 = await axios.get('https://pokeapi.co/api/v2/pokemon?offset=20&limit=20');
        const promises = await Promise.all([p1, p2])
        const result = [...promises[0].data.results, ...promises[1].data.results]
        result.forEach(pokemon => {
            pokNames.push(pokemon.name)
        })

        // get object for each pokemon
        const results = await Promise.all(
            pokNames.map(async (name) => {
                return await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
            })
        );


        // create an object for each pokemon with name, types and image
        results.forEach(pok => {
            const image = pok.data.sprites.front_default;
            const types = pok.data.types.map(e => {
                return e.type.name;
            })
            const weight = pok.data.weight;
            const name = pok.data.name;

            let obj = {
                name,
                image,
                types,
                weight
            }

            pokObj.push(obj)
        })

        // sort fn for object arrays
        function sortOn(arr, prop) {
            arr.sort(
                function (a, b) {
                    if (a[prop] < b[prop]) {
                        return -1;
                    } else if (a[prop] > b[prop]) {
                        return 1;
                    } else {
                        return 0;
                    }
                }
            );
        }

        // eject sort fn
        sortOn(pokObj, "name");


        return res.status(200).json(pokObj)

    } catch (err) {
        res.status(400).json({
            error: err
        })
    }
};

const orderPokemonByForce = async (req, res) => {

    try {

        // array with all pokemon names
        let pokNames = [];

        // object filter to return
        let pokObj = [];
        /*     pokObj = [{
                name,
                types,
                image
            }]
         */

        // search in API to get the pokemons names        
        /*        const result = await axios.get('https://pokeapi.co/api/v2/pokemon'); */
        const p1 = await axios.get('https://pokeapi.co/api/v2/pokemon');
        const p2 = await axios.get('https://pokeapi.co/api/v2/pokemon?offset=20&limit=20');
        const promises = await Promise.all([p1, p2])
        const result = [...promises[0].data.results, ...promises[1].data.results]
        result.forEach(pokemon => {
            pokNames.push(pokemon.name)
        })

        // get object for each pokemon
        const results = await Promise.all(
            pokNames.map(async (name) => {
                return await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
            })
        );


        // create an object for each pokemon with name, types and image
        results.forEach(pok => {
            const image = pok.data.sprites.front_default;
            const types = pok.data.types.map(e => {
                return e.type.name;
            })
            const weight = pok.data.weight;
            const name = pok.data.name;

            let obj = {
                name,
                image,
                types,
                weight
            }

            pokObj.push(obj)
        })

        // sort fn for object arrays
        function sortOn(arr, prop) {
            arr.sort(
                function (a, b) {
                    if (a[prop] < b[prop]) {
                        return -1;
                    } else if (a[prop] > b[prop]) {
                        return 1;
                    } else {
                        return 0;
                    }
                }
            );
        }

        // eject sort fn
        sortOn(pokObj, "weight");


        return res.status(200).json(pokObj)

    } catch (err) {
        res.status(400).json({
            error: err
        })
    }

};

module.exports = { getPokemonsByName, getPokemonById, createPokemon, getFiltPokemon, orderPokemonByName, orderPokemonByForce, getDbPokemons };