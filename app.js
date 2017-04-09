/**
 * App module
 */

'use strict';

require('dotenv').config();
const express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    sessionMiddleware = require('./src/middlewares/session'),
    passport = require('passport'),
    colors = require('colors'),
    flash = require('connect-flash');

//PASSPORT MAIN CONFIGURATION >>>
require('./src/config/passport')(passport);

//STAGE CONFIGURATION >>>
/*
   Defining enviroment
*/
if (app.get('env') === 'development') {
    process.env.NODE_ENV = 'development';
    console.log(`Chosen enviroment => ${process.env.NODE_ENV}`.grey);
} else {
    process.env.NODE_ENV = 'production';
    console.log(`Chosen enviroment => ${process.env.NODE_ENV}`.grey);
}

/*
   Defining mongodb pool connection
*/
if (process.env.NODE_ENV === 'development') {
    mongoose.connect(process.env.DBL_URI);
    mongoose.connection
        .once('open', () => {
            console.log(`mongo :: connected to database :: ${process.env.DBL_URI}`.green);
        })
        .on('error', (error) => {
            console.warn('Warning', error);
        });
} else if (process.env.NODE_ENV === 'production') {
    mongoose.connect('process.env.DBP_URI');
    mongoose.connection
        .once('open', () => {
            console.log(`mongo :: connected to database :: ${process.env.DBP_URI}`.green);
        })
        .on('error', (error) => {
            console.warn('Warning', error);
        });
}

//SETTING UP >>>
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/src/views');
app.set('view engine', 'html');
app.set('view cache', true);
app.engine('html', require('ejs').renderFile);

//MIDDLEWARES >>>
app.use(cookieParser());
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use('/api', require('./src/routers/romApi'));

module.exports = app;
