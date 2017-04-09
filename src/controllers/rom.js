/**
 * Rom api main controllers to manage
 * api endpoint requests
 *
 */

'use strict';

const Gb = require('../models/gb'),
    Gbc = require('../models/gbc'),
    Gba = require('../models/gba'),
    Nes = require('../models/nes'),
    Snes = require('../models/snes');

module.exports = {
    findGbById: (req, res) => {
      console.log("api request has been made");
        Gb.findOne({"gameID":req.params.id })
            .then((doc) => {
                console.log(doc, req.params.id);
                if (!doc) res.send("Not gb game was found")
                else res.json(doc);
            })
            .catch((err) => {
                res.send(err);
            })
    },
    findGbcById: (req, res) => {
        Gbc.findOne({"gameID":req.params.id })
            .then((doc) => {
                console.log(doc, req.params.id);
                if (!doc) res.send("Not gbc game was found")
                else res.json(doc);
            })
            .catch((err) => {
                res.send(err);
            })
    },
    findGbaById: (req, res) => {
        Gba.findOne({"gameID":req.params.id })
            .then((doc) => {
                console.log(doc, req.params.id);
                if (!doc) res.send("Not gba game was found")
                else res.json(doc);
            })
            .catch((err) => {
                res.send(err);
            })
    },
    findNesById: (req, res) => {
        Nes.findOne({"gameID":req.params.id })
            .then((doc) => {
                console.log(doc, req.params.id);
                if (!doc) res.send("Not nes game was found")
                else res.json(doc);
            })
            .catch((err) => {
                res.send(err);
            })
    },
    findSnesById: (req, res) => {
        Snes.findOne({"gameID":req.params.id })
            .then((doc) => {
                console.log(doc, req.params.id);
                if (!doc) res.send("Not snes game was found")
                else res.json(doc);
            })
            .catch((err) => {
                res.send(err);
            })
    }
}
