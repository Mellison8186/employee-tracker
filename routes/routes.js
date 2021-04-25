const express = require('express');
const router = express.Router();
const db = require('../db/connection');

router.use(require('./routes'));

module.exports = router;