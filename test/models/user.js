/**
 * User model which collects all needed fields
 * to populate an user schema
 */

const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ApiAuthSchema = require('./apiAuth'),
    SavedGameSchema = require('./savedGame');

mongoose.Promise = global.Promise;

const UserSchema = new Schema({
    credentials: ApiAuthSchema,
    authType: {
        type: String,
        required: true,
        enum: ['local', 'google', 'facebook', 'twitter']
    },
    username: {
        type: String,
        minlength: [5, 'Min characters are 4'],
        maxlength: [20, 'Max characters are 20'],
        required: 'username is required',
        unique: true
    },
    name: {
        type: String,
        minlength: [2, 'Min characters are 4'],
        maxlength: [12, 'Max characters are 12'],
        required: 'name is required'
    },
    surname: {
        type: String,
        required: 'surname is required',
    },
    email: {
        type: String,
        required: 'email is required',
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    profilePicture: {
        type: String,
        default: "http://ruthusher.com/wordpress/wp-content/themes/Glider/temp/facebook-profile-picture-original-i14.jpg"
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    role: {
        type: String,
        enum: ['normal', 'silver', 'gold', 'admin']
    },
    savedGames: [SavedGameSchema]
});



/************************ Schema Methods *************************/




/************************ Static  Methods *************************/
/**
 * Checks if an username has already been taken
 *
 * @param {cb} callback
 * @return boolean value
 */
UserSchema.statics.usernameExists = function usernameExists(username) {
    return new Promise(
        function(resolve, reject) {
            User.findOne({
                'username': username
            }).then((doc) => {
                resolve(doc !== null);
            }).catch((err) => {
                reject(err);
            });
        });
}

/**
 * Checks if an email has already been taken
 *
 * @param {cb} callback
 * @return boolean value
 */
UserSchema.statics.emailExists = function emailExists(email) {
    return new Promise(
        function(resolve, reject) {
            User.findOne({
                'email': email
            }).then((doc) => {
                resolve(doc !== null);
            }).catch((err) => {
                reject(err);
            });
        });
}

const User = mongoose.model('user', UserSchema);
module.exports = User;
