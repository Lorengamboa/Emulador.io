/**
 * Profile Controller to manage user's info
 * account
 */
const User = require('../models/user'),
    fs = require('fs');

module.exports = {
    view: (req, res) => {
        if (res.authenticated) {
            res.render('profile', {
                title: 'Profile',
                user: res.user,
            });
        } else res.redirect('/');
    },
    update: (req, res) => {
        if (res.authenticated) {
            const updatetype = req.body.action;
            switch (updatetype) {
                case "general":
                    User.findOne({
                            username: req.user.username
                        })
                        .then((user) => {
                            if (user) { //If user has been found
                                user.name = req.body.name;
                                user.surname = req.body.surname;
                                user.bio = req.body.bio;
                                user.save();
                                res.redirect('/profile');
                            } //TODO: Else res.send().status()
                        })
                        .catch((err) => {
                            console.log(err); //TODO: res.send().status()
                        });
                    break;
                case "deleteaccount":
                    console.log("DELETING ACCOUNT");
                    User.findOneAndRemove({
                            username: req.user.username
                        })
                        .then(() => {
                            res.redirect('/');
                        }).catch((err) => {
                            console.log(err);
                        })
                    break;
                default:
                    res.redirect('/profile');
            }
        } else res.redirect('/');
    },
    picture: (req, res) => {
        if (res.authenticated) {
            if (req.file) {
                User.findOne({
                        username: req.user.username
                    })
                    .then((user) => {
                        if (user) {
                            fs.writeFile(`public/img/pf/${user._id}.png`, req.file.buffer, function(err) {
                                if (!err) {
                                    if (user.profilePicture === "https://s-media-cache-ak0.pinimg.com/736x/7f/20/5d/7f205d3be7407e1069115bb963b3f2f8.jpg") {
                                        user.profilePicture = `/img/pf/${user._id}.png`;
                                        user.save();
                                    }
                                }
                            });
                        }
                    })
                    .then((upload_result) => {
                        console.log(upload_result);
                        res.redirect('/profile');
                    })
                    .catch((err) => {
                        console.log(err);
                        res.redirect('/profile');
                    });

            } else res.status(500).send('IMAGE PROFILEPICTURE UPDATE FAILED!');
        } else res.redirect('/');
    }

}
