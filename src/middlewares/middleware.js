/**
 * Middleware functions that will be eventually added to router.js
 */

'use strict';

/* Checks if current client is logged in as an actual register user */
exports.checksLoggedIn = function(req, res, next) {
    res.authenticated = false;
    if (req.isAuthenticated()) {
        res.authenticated = true;
        res.user = {
            'username': req.user.username,
            'name': req.user.name,
            'surname': req.user.surname,
            'profilepic': req.user.profilePicture,
            'email': req.user.email,
            'bio': req.user.bio
        };
    }
    return next();
}

/* Checks if an authenticated user is an admin */
exports.checkAdmin = function(req, res, next) {
    if (req.isAuthenticated && req.user) {
        if (req.user.role === "admin") {
            next();
        } else res.redirect('/');
    } else res.redirect('/');
};

/* Renders 404 view if the request cant be processed*/
exports.pageNotFound404 = function(req, res, next) {
    res.render('404', {
        title: "Page Not Found",
        user: res.user
    });
};

/* Error HTTP 500 Internal server error */
exports.serverError500 = function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
}
