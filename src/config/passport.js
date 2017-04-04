const LocalStrategy = require('passport-local').Strategy,
    FacebookStrategy = require('passport-facebook').Strategy,
    GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

// load up the user model
const User = require('../models/user');

// load the auth variables
const configAuth = require('./auth');

module.exports = function(passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    passport.use('local-login', new LocalStrategy({
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
        },
        function(req, username, password, done) {
            // asynchronous
            process.nextTick(function() {
                User.findOne({
                    'username': username
                }, function(err, user) {
                    // if there are any errors, return the error
                    if (err)
                        return done(err);
                    // if no user is found, return the message
                    if (!user)
                        return done(null, false, req.flash('loginMessage', ''));

                    if (!user.validPassword(password))
                        return done(null, false, req.flash('loginMessage', ''));

                    // all is well, return user
                    else
                        return done(null, user);
                });
            });
        }));

    // =========================================================================
    // FACEBOOK ================================================================
    // =========================================================================
    var fbStrategy = configAuth.facebookAuth;
    fbStrategy.passReqToCallback = true; // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    passport.use(new FacebookStrategy(fbStrategy,
        function(req, token, refreshToken, profile, done) {

            // asynchronous
            process.nextTick(function() {
                // check if the user is already logged in
                if (!req.user) {

                    User.findOne({
                        'credentials.facebook.id': profile.id
                    }, function(err, user) {
                        if (err)
                            return done(err);
                        if (user) {
                            // if there is a user id already but no token (user was linked at one point and then removed)
                            if (!user.facebook.token) {
                                user.facebook.token = token;
                                user.facebook.name = profile.name.givenName + ' ' + profile.name.familyName;
                                user.facebook.email = (profile.emails[0].value || '').toLowerCase();

                                user.save(function(err) {
                                    if (err)
                                        return done(err);

                                    return done(null, user);
                                });
                            }
                            return done(null, user); // user found, return that user
                        } else {
                            // if there is no user, create them
                            var newUser = new User();
                            newUser.facebook.id = profile.id;
                            newUser.facebook.token = token;
                            newUser.facebook.name = profile.name.givenName + ' ' + profile.name.familyName;
                            newUser.facebook.email = (profile.emails[0].value || '').toLowerCase();

                            newUser.save(function(err) {
                                if (err)
                                    return done(err)
                                else
                                    return done(null, newUser);
                            });
                        }
                    });

                } else {
                    // user already exists and is logged in, we have to link accounts
                    var user = req.user; // pull the user out of the session

                    user.facebook.id = profile.id;
                    user.facebook.token = token;
                    user.facebook.name = profile.name.givenName + ' ' + profile.name.familyName;
                    user.facebook.email = (profile.emails[0].value || '').toLowerCase();

                    user.save(function(err) {
                        if (err)
                            return done(err);

                        return done(null, user);
                    });

                }
            });

        }));

    // =========================================================================
    // GOOGLE ==================================================================
    // =========================================================================
    passport.use(new GoogleStrategy({
            clientID: configAuth.googleAuth.clientID,
            clientSecret: configAuth.googleAuth.clientSecret,
            callbackURL: configAuth.googleAuth.callbackURL,
            passReqToCallback: true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
        },
        function(req, token, refreshToken, profile, done) {
            // asynchronous
            process.nextTick(function() {
                // check if the user is already logged in
                if (!req.user) {
                    User.findOne({
                        'credentials.google.id': profile.id
                    }, function(err, user) {
                        if (err)
                            return done(err);
                        if (user) {

                            // if there is a user id already but no token (user was linked at one point and then removed)
                            if (!user.credentials.google.token) {
                                user.credentials.google.token = token;
                                user.authType = 'google';
                                user.name = profile.displayName;
                                user.email = (profile.emails[0].value || '').toLowerCase(); // pull the first email

                                user.save(function(err) {
                                    if (err)
                                        return done(err);

                                    return done(null, user);
                                });
                            }

                            return done(null, user);
                        } else {
                            var newUser = new User({
                                'credentials.google.id': profile.id,
                                'credentials.google.token': token,
                                'authType': 'google',
                                'username': profile.displayName,
                                'name': profile.name.givenName,
                                'surname': profile.name.familyName,
                                'email': (profile.emails[0].value || '').toLowerCase()
                            });

                            newUser.save(function(err) {

                                if (err) {
                                    //const key = Object.keys(err.errors)[0]; //First key value
                                    console.log(err);
                                    return done(err);
                                }

                                return done(null, newUser);
                            });
                        }
                    });

                } else {
                    // user already exists and is logged in, we have to link accounts
                    var user = req.user; // pull the user out of the session
                    user.credentials.google.id = profile.id;
                    user.credentials.google.token = token;
                    user.authType = 'google';
                    user.username = profile.displayName;
                    user.name = profile.name.givenName;
                    user.name = profile.name.familyName;
                    user.email = (profile.emails[0].value || '').toLowerCase(); // pull the first email

                    user.save(function(err) {
                        if (err)
                            return done(err);

                        return done(null, user);
                    });

                }

            });

        }));

};
