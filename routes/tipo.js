const { Router } = require('express');
const { getByType } = require('../controllers/tipo.controller');

const router = Router();

router.get('/', getByType);

module.exports = router;