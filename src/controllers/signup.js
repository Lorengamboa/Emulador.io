/**
 *
 *
 */

const User = require('../models/user'),
    mailer = require('../utils/mailerClass');

module.exports = {
    view: (req, res) => {
        res.render('signup', {
            title: 'Sign up'
        });
    },
    local: function local(req, res) {

        const user = new User({
            'credentials.local': {
                'password': User.generateHash(req.body.password)
            },
            'username': req.body.username,
            'authType': 'local',
            'name': req.body.name,
            'surname': req.body.surname,
            'email': req.body.email
        });

        /*
         * Validation of the user instance properties
         */
        Promise.all([User.usernameExists(req.body.username), User.emailExists(req.body.email)])
            .then((result) => {
                if (result[0]) res.status(400).send("username not available!");
                else if (result[1]) res.status(400).send("email not available!");
                else {
                    user.save()
                        .then((result) => {
                            // send mail with defined transport object
                            mailer.sendMail(require('../utils/mail_template').welcome('lorenzogamboagarcia@gmail.com', req.body.email), (error, info) => {
                                if (error) {
                                    return console.log(error);
                                }
                                console.log('Message %s sent: %s', info.messageId, info.response);
                            });

                            res.sendStatus(200, "OK");
                        })
                        .catch((err) => {
                            const key = Object.keys(err.errors)[0]; //First key value
                            console.log(key);
                            if (err.name === 'ValidationError') res.status(400).send(err.errors[key].message);
                            else res.status(400).send("Bad request mate!");
                        });
                }
            }).catch((err) => {
                console.log(err);
                res.status(400).send("Bad request mate!");
            })
    },
    //New user created from google api auth
    google: function google(token, profile) {



    },
    //New user created from facebook api auth
    facebook: function facebook(req, res) {

    },
    //New user created from twitter api auth
    twitter: function twitter(req, res) {

    }
}
