/**
 * Emulator controller
 */

'use strict';

const Gb = require('../models/gb'),
    Gbc = require('../models/gbc'),
    Gba = require('../models/gba'),
    Nes = require('../models/nes'),
    Snes = require('../models/snes');
    //redisClient = require('../utils/redisClient');

require('dotenv').config();

module.exports = {
    gameListView: (req, res) => {
        let consoleModel,
            nPages = 0,
            npage = Number(req.query.page) - 1,
            npagination = Number(process.env.GAMELIST_LIMIT),
            top5played = [];

        switch (req.route.path) {
            case '/gameboy':
                consoleModel = Gb;
                break;
            case '/gameboy-color':
                consoleModel = Gbc;
                break;
            case '/gameboy-advance':
                consoleModel = Gba;
                break;
            case '/nes':
                consoleModel = Nes;
                break;
            case '/snes':
                consoleModel = Snes;
                break;
            default:
                consoleModel = undefined;
        }

        Promise.all([consoleModel.topPlayed(), consoleModel.count({})])
            .then((result) => {
                top5played = result[0];
                nPages = Math.ceil(result[1] / process.env.GAMELIST_LIMIT);
            })
            .then(() => {
                renderView();
            })
            .catch((err) => {
                console.log("Error::", err);
            });

        /*
         * Function that returns console gamelist view
         */
        const renderView = () => {
            consoleModel.find({})
                .skip(npage * npagination)
                .limit(npagination)
                .then((games) => {
                    res.render('portal_console', {
                        title: 'Gameboy Roms',
                        user: res.user,
                        console: req.route.path,
                        games: games,
                        pages: nPages,
                        npage: npage,
                        top5played: top5played
                    });
                })
                .catch((err) => {
                    console.warn(err);
                });
        };

    },
    selectGame: (req, res) => {
        const game_id = req.params.game_id;
        let console, consoleModel, played, recentplayed;
        switch (req.route.path) {
            case '/gameboy/:game_id':
                consoleModel = Gb;
                console = "gameboy";
                break;
            case '/gameboy-color/:game_id':
                consoleModel = Gbc;
                console = "gameboycolor";
                break;
            case '/gameboy-advance/:game_id':
                consoleModel = Gba;
                console = "gameboyadvance";
                break;
            case '/nes/:game_id':
                consoleModel = Nes;
                console = "nes";
                break;
            case '/snes/:game_id':
                consoleModel = Snes;
                console = "snes";
                break;
        }

        consoleModel.findOne({
            'gameID': game_id
        }, (err, ob) => {
            if (ob) {
                ob.increaseViews();
                res.render(console, {
                    title: `${console}`,
                    user: res.user,
                    rom: ob.description.romurl
                });
            } else res.send("ROM NOT FOUND");
        });
    }
}
