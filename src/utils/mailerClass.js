/**
 *
 */
const auth = require('../config/auth'),
    nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    service: auth.nodemailerAuth.SERVICE,
    auth: {
        user: auth.nodemailerAuth.USER,
        pass: auth.nodemailerAuth.PASSWORD
    }
});

console.log("Node mailer working!".blue);

module.exports = transporter;
