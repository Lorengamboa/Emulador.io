/**
 * Login controller
 */

'use strict';
exports.logout = function(req, res) {
    if (req.isAuthenticated()) {
        req.logout();
        res.redirect(req.headers.referer);
    } else res.redirect(req.headers.referer);
};
