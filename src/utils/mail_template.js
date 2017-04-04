/**
 * List of mail templates to notify either
 * a user or a collection of users about a
 * certain issue
 */

function welcoming(from, to) {
    const options = {
        from: from,
        to: to,
        subject: 'Welcome to Emulator.io', // Subject line
        text: 'Welcome to Emulator.io', // plain text body
        html: '<b>blah blah blah ?</b>' // html body
    };
    return options;
}

function weeklyNews(from, to) {
    const options = {
        from: from,
        to: to,
        subject: 'Welcome to Emulator.io', // Subject line
        text: 'Welcome to Emulator.io', // plain text body
        html: '<b>blah blah blah ?</b>' // html body
    };
    return options;
}

function rememberPassword(from, to, keycode) {
    const options = {
        from: from,
        to: to,
        subject: 'Reset password',
        html: `You have requested a new password reset, to make it happen go to the following link and reset it ${keycode}`
    };
    return options;
}

module.exports = {
    welcome: welcoming,
    news: weeklyNews,
    forgot: rememberPassword
}
