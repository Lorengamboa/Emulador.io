/**
 * Game schema
 */

'use sctict';
const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const GameDescriptionSchema = new Schema({
    'console': String,
    'genre': String,
    'synopsis': String,
    'dateRealese': Date,
    'romurl': String
});

module.exports = GameDescriptionSchema;
