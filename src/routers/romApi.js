/**
 * Rom api endpoints
 */

'use strict';
var express = require('express');
var router = express.Router();
var controllers = require('../controllers/rom');

/* Searchs for a specific gb game */
router.get('/gb/:id', controllers.findGbById);

/* Searchs for a specific gbc game */
router.get('/gbc/:id', controllers.findGbcById);

/* Searchs for a specific gba game */
router.get('/gba/:id', controllers.findGbaById);

/* Searchs for a specific nes game */
router.get('/nes/:id', controllers.findNesById);

/* Searchs for a specific snes game */
router.get('/snes/:id', controllers.findSnesById);

module.exports = router;
