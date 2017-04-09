/**
 * Api auth Schem
 */

'use strict';
const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const ApiAuthSchema = new Schema({
    local: {
        password: String,
        keycode: String
    },
    facebook: {
        id: String,
        token: String
    },
    google: {
        id: String,
        token: String
    }
});

module.exports = ApiAuthSchema;
