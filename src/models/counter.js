const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

mongoose.Promise = global.Promise;
var counterSchema = mongoose.Schema({
    "_id": {
        "type": String,
        "required": true
    },
    "seq": {
        "type": Number,
        "default": 0
    }
});

var Counter = mongoose.model('counter', counterSchema);
module.exports = Counter;
