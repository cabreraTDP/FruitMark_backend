const express = require('express');
const router = express.Router();
const {getAllStores} = require('./functions.js')

router.get('/', getAllStores);

module.exports = router;