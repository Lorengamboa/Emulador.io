const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    gameDescription = require('./gameDescription');

mongoose.Promise = global.Promise;

const GbSchema = new Schema({
    'title': String,
    'description': gameDescription,
    'cover_img': String,
    'date': Date
});

const Gb = mongoose.model('gb', GbSchema);

module.exports = Gb;
