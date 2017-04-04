const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const GameDescriptionSchema = new Schema({
    'console': String,
    'synapsis': String,
    'dateRealese': Date,
    'romurl': String
});

module.exports = GameDescriptionSchema;
