/**
 * Login controller to authenticate the client
 * so it can either or not acess the requested
 * view
 */
const User = require('../models/user'),
    mailer = require('../utils/mailerClass'),
    KeyCode = require('../utils/keycode');

module.exports = {
    view: (req, res) => {
        if (req.isAuthenticated()) {
            res.render('index', {
                title: 'Emulador.io portal',
                user: res.user
            });
        } else res.render('login');
    },
    failView: (req, res) => {
        if (req.isAuthenticated()) {
            res.render('index', {
                title: 'Emulador.io portal',
                user: res.user
            });
        } else res.render('loginfail');
    },
    resetPasswordView: (req, res) => {
        res.render('resetpassword', {
            title: 'Reset password',
            user: res.user
        });
    },
    resetPassword: (req, res) => {
        var keycode = new KeyCode();
        keycode.generateKeycode();
        User.findOne({
                'username': req.body.username
            })
            .then((user) => {
                if (user && user.authType === 'local') {
                    user.set({
                        'credentials.local.keycode': keycode.keycode
                    });
                    return user.save();
                }
            })
            .then((result) => {
                if (result) {
                    mailer.sendMail(require('../utils/mail_template').forgot('lorenzogamboagarcia@gmail.com', result.email, keycode.keycode), (error, info) => {
                        if (error) {
                            return res.status(500).send("Server Error");
                        } else {
                            console.log('Message %s sent: %s', info.messageId, info.response);;
                            res.sendStatus(200, "OK");
                        }
                    });
                } else res.status(400).send("Bad request mate!");
            })
            .catch((err) => {
                console.log(err);
                res.status(500).send("Server Error");
            });
    },
    rememberUsername: (req, res) => {

    }
}
