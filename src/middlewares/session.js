/**
 * Session middleware
 */

'use strict';
var session = require('express-session'),
    mongoose = require('mongoose'),
    MongoStore = require('connect-mongo')(session);
    require('dotenv').config();

var sessionMiddleware = session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 18000000
    },
    store: new MongoStore({
        mongooseConnection: mongoose.connection,
        stringify: false
    })
})

module.exports = sessionMiddleware;
