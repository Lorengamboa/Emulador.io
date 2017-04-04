/**
 * Web server core
 */

'use strict';

const app = require('./app'),
    server = require('http').Server(app),
    passport = require('passport');

//ROUTES >>>
require('./src/routers/router')(app, passport);

//CHAT CONNECTION >>>
require('./src/chat/chat')(server);

//LAUNCHES SERVER >
server.listen(app.get('port'), function() {
    console.log(`Express server listening on port: ${app.get('port')}`.rainbow);
});
