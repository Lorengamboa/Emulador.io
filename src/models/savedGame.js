/**
 * Subdocument Schema that contains
 * a saved room game info
 */
 
const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const SavedgameSchema = new Schema({
    platform: {
        type: String,
        enum: ['n64', 'gb', 'nes'],
        required: true
    },
    rom: {
        type: String,
        required: true
    },
    storage: {
        type: String,
        required: true
    }
});

module.exports = SavedgameSchema;
