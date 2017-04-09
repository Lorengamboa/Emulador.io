/**
 * Packages up all the controllers into a single object
 * and export it as a single module
 */

'use strict';
const indexController = require('../controllers/index'),
    loginController = require('../controllers/login'),
    signupController = require('../controllers/signup'),
    logoutController = require('../controllers/logout'),
    profileController = require('../controllers/profile'),
    adminController = require('../controllers/admin'),
    emulatorController = require('../controllers/emulator'),
    searchController = require('../controllers/search');

function indexView(req, res) {
    indexController.view(req, res);
}

function loginView(req, res) {
    loginController.view(req, res);
};

function loginFailView(req, res) {
    loginController.failView(req, res);
};

function resetPasswordView(req, res) {
    loginController.resetPasswordView(req, res);
};

function resetPassword(req, res) {
    loginController.resetPassword(req, res);
};

function loginLocal(passport) {
    loginController.local(passport);
}

function signupView(req, res) {
    signupController.view(req, res);
};

function signupLocal(req, res) {
    signupController.local(req, res);
};

function logout(req, res) {
    logoutController.logout(req, res);
};

function profileView(req, res) {
    profileController.view(req, res);
}

function profileUpdate(req, res) {
    profileController.update(req, res);
}

function profileUpdateProfilePicture(req, res) {
    profileController.picture(req, res);
}

function adminUploadRoam(req, res) {
    adminController.uploadRoam(req, res);
};

function adminPanelView(req, res) {
    adminController.panelView(req, res);
}

function adminUploadRoamView(req, res) {
    adminController.uploadRoamView(req, res);
}

function adminUsersView(req, res) {
    adminController.usersView(req, res);
}

function emulatorGameListView(req, res) {
    emulatorController.gameListView(req, res);
}

function emulatorSelectGame(req, res) {
    emulatorController.selectGame(req, res);
}

function searchAll(req, res) {
    searchController.all(req, res);
}

module.exports = {
    indexView: indexView,
    loginView: loginView,
    loginFailView: loginFailView,
    loginLocal: loginLocal,
    resetPasswordView: resetPasswordView,
    resetPassword: resetPassword,
    signupView: signupView,
    signupLocal: signupLocal,
    logout: logout,
    profileView: profileView,
    profileUpdate: profileUpdate,
    profileUpdateProfilePicture: profileUpdateProfilePicture,
    adminPanelView: adminPanelView,
    adminUploadRoamView: adminUploadRoamView,
    adminUploadRoam: adminUploadRoam,
    adminUsersView: adminUsersView,
    emulatorGameListView: emulatorGameListView,
    emulatorSelectGame: emulatorSelectGame,
    searchAll: searchAll
};
