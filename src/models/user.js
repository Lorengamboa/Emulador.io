/**
 * User model
 */

'use strict';
const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ApiAuthSchema = require('./apiAuth'),
    SavedGameSchema = require('./savedGame'),
    bcrypt = require('bcrypt-nodejs');

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
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    profilePicture: {
        type: String,
        default: "https://s-media-cache-ak0.pinimg.com/736x/7f/20/5d/7f205d3be7407e1069115bb963b3f2f8.jpg"
    },
    bio: {
        type: String,
        maxlength: [90, 'Bio can only 90 characters as max']
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    lastLogin: {
        type: Date,
        default: Date.now()
    },
    role: {
        type: String,
        enum: ['normal', 'silver', 'gold', 'admin'],
        default: 'normal'
    },
    savedGames: [SavedGameSchema]
});

/****************** Schema Virtual Objects ************************/

/**
 *
 *
 */


/************************ Schema Methods *************************/

/**
 * Checks if password is valid
 *
 * @param {password} - User's password
 * @return a boolean value
 */
UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.credentials.local.password);
};

/************************ Static  Methods *************************/

/**
 * Hashes the inputted password and adds it Salt
 *
 * @param {password} - User's password
 * @return a hashed password
 */
UserSchema.statics.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

/**
 * Checks if an username has already been taken
 *
 * @param {username} - User's username
 * @return boolean value
 */
UserSchema.statics.usernameExists = function(username) {
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
