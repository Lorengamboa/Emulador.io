/**
 * Helper to play with gba on certain queries
 */

'use strict';
const assert = require('assert');
const Gb = require('./models/gb');

describe('GB test', () => {
    let pkmred, pkmblue, pkmyellow;
    var d = new Date();
    var date = d.getTime();
    beforeEach((done) => {
        pkmred = new Gb({
            title: 'Pokemon Red',
            description: {
                console: 'Gameboy',
                synapsis: 'Sad story about ash kepchup...',
                dateRealese: date,
                romurl: '/roms/pokemon_red.gb'
            },
            cover_img: 'img/jpg/pokemonred.png',
            date: date
        });

        pkmblue = new Gb({
            title: 'Pokemon Blue',
            description: {
                console: 'Gameboy',
                synapsis: 'Sad story about blue...',
                dateRealese: date,
                romurl: '/roms/pokemon_blue.gb'
            },
            cover_img: 'img/jpg/pokemonblue.png',
            date: date
        });

        pkmyellow = new Gb({
            title: 'Pokemon Yellow',
            description: {
                console: 'Gameboy',
                synapsis: 'Sad story about yellow...',
                dateRealese: date,
                romurl: '/roms/pokemon_yellow.gb'
            },
            cover_img: 'img/jpg/pokemonyellow.png',
            date: date
        });

        //SAVES IN PARALLEL
        Promise.all([pkmred.save(), pkmblue.save(), pkmyellow.save()])
            .then(() => done());
    });

    it('Find a gb game with a particular id', (done) => {
        Gb.findOne({
                _id: pkmred._id
            })
            .then((game) => {
                assert(game.title === 'Pokemon Red');
                done();
            }).catch((err) => {
                console.log(err);
            })
    });

    it('Paginate gb collection and retreives 2 first documents', (done) => {
        Gb.find({})
            .limit(2)
            .then((games) => {
                assert(games.length === 2);
                assert(games[0].title === 'Pokemon Red');
                assert(games[1].title === 'Pokemon Blue');
                done();
            }).catch((err) => {
                console.log(err);
            })
    });

    it('Counts number of documents that the collection has', (done) => {
        Gb.count({}, function(err, count) {
            assert(count === 3);
            done();
        });

    });

});
