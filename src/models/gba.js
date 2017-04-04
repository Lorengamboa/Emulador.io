const mongoose = require('mongoose'),
    counter = require('./counter'),
    gameDescription = require('./gameDescription'),
    Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

const GbaSchema = new Schema({
    'gameID': {
        type: String,
        required: true
    },
    'title': String,
    'description': gameDescription,
    'cover_img': String,
    'upload_date': {
        type: Date,
        default: Date.now
    },
    'views': {
        type: Number,
        default: 0
    }
});

/************************** Methods *****************************/

/**
 * Increase by 1 every time a client plays a game
 */
GbaSchema.methods.increaseViews = function() {
    let doc = this;
    doc.update({
            $inc: {
                views: 1
            }
        })
        .then((result) => {
            console.log(result);
        });
}

/**
 * Retreives 5 most gb played games
 *
 * @return 5 gb documents
 */
GbaSchema.statics.topPlayed = function() {
    return new Promise(function(resolve, reject) {
        Gba.find()
            .sort({
                views: -1
            })
            .limit(5)
            .then((result) => {
                resolve(result);
            })
            .catch((err) => {
                reject(err);
            });
    });
}

/************************** Hooks *****************************/

/**
 * Assigns an gbID to the new gb game
 */
GbaSchema.pre('save', function(next) {
    var doc = this;
    counter.findByIdAndUpdate({
        "_id": "gbaID"
    }, {
        "$inc": {
            "seq": 1
        }
    }, function(error, counter) {
        if (error) return next(error);
        doc.gameID = counter.seq.toString();
        next();
    });
});

const Gba = mongoose.model('gba', GbaSchema);
module.exports = Gba;
