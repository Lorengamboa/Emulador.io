/**
 * Admin controller to manage those operations
 * that can only be done by a user with the role
 * of admin
 */

'use strict';

const User = require('../models/user'),
    Gb = require('../models/gb'),
    Gbc = require('../models/gbc'),
    Gba = require('../models/gba'),
    Nes = require('../models/nes'),
    Snes = require('../models/snes'),
    fs = require('fs');

module.exports = {

    panelView: (req, res) => {
        res.render('admin/panel', {
            title: 'Admin panel',
            user: res.user
        });
    },

    uploadRoamView: (req, res) => {
        res.render('admin/uploadrom', {
            title: 'Upload roam',
            user: res.user
        });
    },

    uploadRoam: (req, res) => {
        var consoleModel,
            console;

        switch (req.body.console) {
            case 'gameboy':
                consoleModel = Gb;
                console = "gb";
                break;
            case 'gameboy-color':
                consoleModel = Gbc;
                console = "gbc";
                break
            case 'gameboy-advance':
                consoleModel = Gba;
                console = "gba";
                break;
            case 'nes':
                consoleModel = Nes;
                console = "nes";
                break;

            case 'snes':
                consoleModel = Snes;
                console = "snes";
                break;
        }

        const rom = new consoleModel({
            gameID: "undefined",
            title: req.body.title,
            description: {
                console: req.body.console,
                synopsis: req.body.synopsis,
                romurl: req.file.originalname
            },
            cover_img: req.body.cover,
        });

        fs.writeFile(`public/roms/${console}/${req.file.originalname}`, req.file.buffer, function(err) {
            if (!err) {
                rom.save()
                    .then((result) => {
                        res.status(200).send("Rom upload suceed!");
                    }).catch((err) => {
                        res.status(400).send("Rom upload failed");
                        console.log(err);
                    });
            } else res.status(400).send(err);
        });
    },
    usersView: (req, res) => {
        User.find({}, {
            credentials: 0
        }, (err, users) => {
            if (err) {
                console.log(err);
                res.redirect('/admin');
            } else {
                res.render('admin/users_community', {
                    title: 'User community',
                    user: res.user,
                    users: users
                });
            }
        });
    }

}
