var session = require('express-session'),
    mongoose = require('mongoose'),
    MongoStore = require('connect-mongo')(session);

var sessionMiddleware = session({
    secret: 'cHoRiZoDeCaNtIpAlO93',
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
