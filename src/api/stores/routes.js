const express = require('express');
const authenticate = require('../authentication');
const router = express.Router();
const {getAllStores, sendStockAmongStores} = require('./functions.js')

router.get('/', getAllStores);
router.get('/transfer',authenticate,sendStockAmongStores);

module.exports = router;