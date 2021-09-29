const { Pokemon } = require('../db');
const { Tipo } = require('../db')
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

const getPokemons = async (req, res) => {

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
            const attack = pok.data.stats[1].base_stat;
            const name = pok.data.name;
            const id = pok.data.id

            let obj = {
                id,
                name,
                image,
                types,
                attack
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

const getDbPokemons = async (req, res) => {
    try {

        let pokemons = [];
        let pokObj = []

        try {

            // search pokemons in DB
            pokemons = await Pokemon.findAll({
                include: Tipo
            });
        }
        catch (err) {
            console.log("No se pudo guardar en la DB")
        }

        pokemons.forEach(pok => {
            const types = pok.tipos.map(e => {
                return e.name;
            })
            const attack = pok.attack
            const name = pok.name;
            const id = pok.id

            let obj = {
                id,
                name,
                types,
                attack
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

const getPokemonsByName = async (req, res) => {

    try {

        const { pokemonName } = req.query;

        if (!pokemonName) {
            return res.status(400).json({
                message: "Please insert name"
            })
        }

        // variables to validate
        let apiPok = "";
        let dbPok = "";
        let apiObj = [];
        let dbObj = [];

        // search in DB
        try {
            dbPok = await Pokemon.findOne({
                include: Tipo,
                where: {
                    name: pokemonName
                }
            })

            const name = dbPok.name
            const types = dbPok.tipos.map(pok => {
                return pok.name
            })
            const attack = dbPok.attack
            const id = dbPok.id

            dbObj = {
                id,
                name,
                attack,
                types
            }

            console.log("OBJETO DB", dbObj)

        } catch (err) {
            console.log("Pokemon does not exist in DB")
        }

        // search in API
        try {
            apiPok = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
            const name = apiPok.data.name
            const image = apiPok.data.sprites.front_default
            const types = apiPok.data.types.map(pok => {
                return pok.type.name
            })
            const attack = apiPok.data.stats[1].base_stat;
            const id = apiPok.data.id

            apiObj = {
                id,
                name,
                image,
                attack,
                types
            }
        }
        catch (err) {
            console.log("Pokemon does not exist in API")
        }

        if (apiPok != "") {
            return res.status(200).json(apiObj);
        }

        if (dbPok != "") {
            return res.status(200).json(dbObj)
        }

        return res.status(400).json({
            message: "Pokemon does not exists"
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

        // variables to validate
        let apiPok = "";
        let dbPok = "";
        let apiObj = [];
        let dbObj = [];

        /*         // var to check if id model looks like xxxx-xxxx-xxx
                const idVer = id.includes('-'); */


        // if id has - search pokemon in DB, if not in de API
        try {

            dbPok = await Pokemon.findOne({
                include: Tipo,
                where: {
                    id
                }
            });

            const pokId = dbPok.id
            const name = dbPok.name
            const types = dbPok.tipos.map(pok => {
                return pok.name
            })
            const weight = dbPok.weight
            const height = dbPok.height
            const life = dbPok.life
            const attack = dbPok.attack
            const defense = dbPok.defense
            const speed = dbPok.speed
    
    
            dbObj = {
                id: pokId,
                name,
                life,
                attack,
                defense,
                speed,
                weight,
                height,
                types
            }

            return res.status(200).json(dbObj);

        } catch (err) {
            console.log("Pokemon does not exist in DB")
        }


        // search in API
        try {

            apiPok = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);

        }
        catch (err) {
            console.log("Pokemon does not exist in API")
        }

        const pokId = apiPok.data.id
        const name = apiPok.data.name
        const image = apiPok.data.sprites.front_default
        const types = apiPok.data.types.map(pok => {
            return pok.type.name
        })
        const weight = apiPok.data.weight
        const height = apiPok.data.height
        const life = apiPok.data.stats[0].base_stat
        const attack = apiPok.data.stats[1].base_stat
        const defense = apiPok.data.stats[2].base_stat
        const speed = apiPok.data.stats[5].base_stat


        apiObj = {
            id: pokId,
            name,
            image,
            life,
            attack,
            defense,
            speed,
            weight,
            height,
            types
        }

        if (apiPok != "") {
            return res.status(200).json(apiObj);
        }
        
        return res.status(400).json({
            message: "Not exist pokemons with that id"
        })

    } catch (err) {
        return res.status(400).json({
            error: err
        })
    }
};

const createPokemon = async (req, res) => {

    try {


        const { name, life, attack, defense, speed, height, weight, types } = req.body;

        // create a new instance of Pokemon
        const newPokemon = await Pokemon.create({
            name,
            life,
            attack,
            defense,
            speed,
            height,
            weight
        });

        await newPokemon.addTipos(types)

        return res.status(200).json(newPokemon)

    } catch (err) {
        return res.status(400).json({
            error: err
        })
    }
};

module.exports = { getPokemonsByName, getPokemonById, createPokemon, getPokemons, getDbPokemons };