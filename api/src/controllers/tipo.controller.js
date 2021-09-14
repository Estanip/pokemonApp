const { Tipo } = require('../db');

const getByType = async (req, res) => {

    try {

        const types = await Tipo.findAll();

        return res.status(200).json({
            data: types
        })

    } catch (err) {
        return res.status(400).json({
            error: err
        })
    }



};

module.exports = { getByType };