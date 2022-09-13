const express = require('express');
const router = express.Router();
const {signIn, createUser } = require('./functions');

router.post('/signIn', signIn);
router.post('/createUser', createUser);


module.exports = router;