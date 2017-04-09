/**
 * Search controller
 */

'use strict';
const Gb = require('../models/gb'),
    Gbc = require('../models/gbc'),
    Gba = require('../models/gba'),
    Nes = require('../models/nes'),
    Snes = require('../models/snes');

module.exports = {
  
    all: (req, res) => {
        let foundGames = [];
        Promise.all([searchGb(req.query.game), searchGbc(req.query.game), searchGba(req.query.game), searchNes(req.query.game), searchSnes(req.query.game)])
            .then((result) => {
                result.forEach((resultIndex) => {
                    if (resultIndex.length > 0) {
                        resultIndex.forEach((game) => {
                            foundGames.push(game);
                        })
                    }
                });

                res.render('search', {
                    title: 'Emulador.io found game',
                    user: res.user,
                    games: foundGames
                });
            })
            .catch((err) => {
                console.log(err);
            })
    }
}

/**
 * [searchGb description]
 * @param  {[type]} query [description]
 * @return {Promise}         [description]
 */
function searchGb(query) {
    return Gb.find({
        $text: {
            $search: `\"${query}\"`
        }
    });
}

/**
 * [searchGbc description]
 * @param  {[type]} query [description]
 * @return [type]         [description]
 */
function searchGbc(query) {
    return Gbc.find({
        $text: {
            $search: `\"${query}\"`
        }
    });

}

/**
 * [searchGba description]
 * @param  {[type]} query [description]
 * @return [type]         [description]
 */
function searchGba(query) {
    return Gba.find({
        $text: {
            $search: `\"${query}\"`
        }
    });
}

/**
 * [searchGba description]
 * @param  {[type]} query [description]
 * @return [type]         [description]
 */
function searchNes(query) {
    return Nes.find({
        $text: {
            $search: `\"${query}\"`
        }
    });
}

/**
 * [searchGba description]
 * @param  {[type]} query [description]
 * @return [type]         [description]
 */
function searchSnes(query) {
    return Snes.find({
        $text: {
            $search: `\"${query}\"`
        }
    });
}
