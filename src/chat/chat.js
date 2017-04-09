/**
 * Chat module
 */

'use strict';
const sessionMiddleware = require('../middlewares/session'),
    User = require('../models/user');

module.exports = function(server) {
    var io = require('socket.io')(server);

    //Une sessions con socket.io
    io.use(function(socket, next) {
        sessionMiddleware(socket.request, socket.request.res, next);
    });

    io.on('connection', function(client) {
        let username = `Guest`;
        let profilepicture = "https://pbs.twimg.com/profile_images/716487122224439296/HWPluyjs.jpg";

        if (client.request.session.passport !== undefined || null) {
            User.findById(client.request.session.passport.user)
                .then((doc) => {
                    if (doc) {
                        username = doc.username;
                        profilepicture = doc.profilePicture;
                    }
                })
                .catch((err) => {
                    console.warn(err);
                });
        }
        client.on('room', function(room) {
            client.join(room);
            client.in(room).emit('bot', `${username} just joined the room!`);
        });

        client.on('chat message', function(msg) {
            client.in(msg['room']).emit('chat message', {
                user: username,
                text: msg['message'],
                profilepicture: profilepicture
            });
        });

        client.on('disconnect', function() {
            console.log('user disconnected');
        });
    });
}
