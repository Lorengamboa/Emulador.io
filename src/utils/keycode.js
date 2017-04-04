/**
 *
 *
 */

class KeyCodeClass {
    constructor() {
        this.keycode = null;
    }
    generateKeycode() {
        var keycode = "";
        var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 5; i++)
            keycode += characters.charAt(Math.floor(Math.random() * characters.length));
            this.keycode = keycode;
    }
    keycode() {
        return this.keycode;
    }
}


module.exports = KeyCodeClass;
