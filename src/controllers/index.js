/**
 * Index controller
 */

'use strict';
module.exports = {
    view: (req, res) => {
        res.render('index', {
            title: 'Emulador.io portal',
            user: res.user
        });
    }
}
