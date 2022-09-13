const express = require('express');
const router = express.Router();
const {prueba} = require('./functions.js')

router.get('/', prueba);

module.exports = router;