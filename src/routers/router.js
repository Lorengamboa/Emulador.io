/**
 * Router js file
 *
 * Http Methods implemented : POST, GET, DELETE, PATCH
 */

const express = require('express'),
    controllers = require('../controllers/main'),
    middlewares = require('../middlewares/middleware'),
    multer = require('multer'),
    upload = multer();

module.exports = function(app, passport) {


    // Hook to check if current cliend is logged in
    app.use(middlewares.checksLoggedIn);

    /*
     * Renders index view where
     * a set of console games are
     * listed
     */
    app.get('/', controllers.indexView);

    /*
     * Renders login view where
     * client can login locally/google/twitter
     */
    app.get('/login', controllers.loginView);

    /*
     * Authenticate the client locally
     */
    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/', // redirect to the secure profile section
        failureRedirect: '/loginfail', // redirect back to the signup page if there is an error
    }));

    app.get('/loginfail', controllers.loginFailView);

    /*
     * Authenticate the client agains the google api auth
     */
    app.get('/auth/google', passport.authenticate('google', {
        scope: ['profile', 'email']
    }));

    /*
     * The callback after google has authenticated the user
     */
    app.get('/auth/google/callback', passport.authenticate('google'), function(req, res) {
        if (req.isAuthenticated()) {
            res.redirect(req.headers.referer);
        } else res.redirect('/');
    });

    /*
     * Renders resetpassword view
     */
    app.get('/resetpassword', controllers.resetPasswordView);

    /*
     * Renders resetpassword view
     */
    app.post('/resetpassword', controllers.resetPassword);

    /*
     * Renders signup view where
     * client can sign up locally
     */
    app.get('/signup', controllers.signupView);

    /*
     * Once the client post completes the sign-up
     * form, it's validate to see whether or not
     * it will be saved
     */
    app.post('/signup', controllers.signupLocal);

    /*
     * Renders user profile view
     */
    app.get('/profile', controllers.profileView);

    /*
     * Updates user's profile general/advanced info
     */
    app.post('/profile', controllers.profileUpdate);

    /*
     * Updates user's profielpic
     */
    app.post('/uprofilepic', upload.single('profilepic'), controllers.profileUpdateProfilePicture);


    // Hook to check if current client is an admin
    app.use('/admin', middlewares.checkAdmin);

    /*
     * Renders admin panel view
     */
    app.get('/admin', controllers.adminPanelView);

    /*
     * Renders upload roam view
     */
    app.get('/admin/uploadrom', controllers.adminUploadRoamView);

    /*
     * Inserts a new roam
     */
    app.post('/admin/uploadrom', upload.single('rom'), controllers.adminUploadRoam);

    /*
     * Renders user community view
     */
    app.get('/admin/users', controllers.adminUsersView);

    /*
     * Kills user session and takes him to portal
     */
    app.get('/logout', controllers.logout);

    /*
     * Shows all game that matches with the introduced query
     */
    app.get('/search', controllers.searchAll);

    // =========================================================================
    // ====================       NES API       ================================
    // =========================================================================

    /*
     * Renders nes portal game list view
     */
    app.get('/nes', controllers.emulatorGameListView);

    /*
     * Renders the selected nes game
     */
    app.get('/nes/:game_id', controllers.emulatorSelectGame);

    // =========================================================================
    // ====================       SNES API       ===============================
    // =========================================================================

    /*
     * Renders snes portal game list view
     */
    app.get('/snes', controllers.emulatorGameListView);

    /*
     * Renders the selected snes game
     */
    app.get('/snes/:game_id', controllers.emulatorSelectGame);

    // =========================================================================
    // ====================        GB  API       ===============================
    // =========================================================================

    /*
     * Renders GB portal game list view
     */
    app.get('/gameboy', controllers.emulatorGameListView);

    /*
     * Renders the selected gb game
     */
    app.get('/gameboy/:game_id', controllers.emulatorSelectGame);

    // =========================================================================
    // ====================        GBC API       ===============================
    // =========================================================================

    /*
     * Renders GBC portal game list view
     */
    app.get('/gameboy-color', controllers.emulatorGameListView);

    /*
     * Renders the selected gb game
     */
    app.get('/gameboy-color/:game_id', controllers.emulatorSelectGame);

    // =========================================================================
    // ====================        GBA API       ===============================
    // =========================================================================

    /*
     * Renders GB portal game list view
     */
    app.get('/gameboy-advance', controllers.emulatorGameListView);

    /*
     * Renders the selected gb game
     */
    app.get('/gameboy-advance/:game_id', controllers.emulatorSelectGame);

    // =========================================================================
    // ====================        ARCADE API       ============================
    // =========================================================================

    /*
     * Renders Arcade portal view
     */
    app.get('/arcade', (req, res) => {
        res.render('portal_arcade', {
            title: 'Arcade console',
            user: res.user
        });
    });

    // Middleware that redirects to page 404
    app.use(middlewares.pageNotFound404);


    // Middleware that handles server errors
    app.use(middlewares.serverError500);
};
