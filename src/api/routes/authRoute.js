const userTwitterController = require("../controllers/userTwitterController");
const passport = require("passport");
const Strategy = require("passport-twitter").Strategy;
const userTwitter = require('../models/userTwitter');
const sessionsModel = require('../models/sessionsModel');

module.exports = (app) => {
    passport.use(
        new Strategy(
            {
                consumerKey: "ZJFUHbZQWSIqxc7gcQOjUen0Y",
                consumerSecret: "6wJbtuEaBDAitB7exJz6lvEEMaOp5gPUMkLVWGAkcC3x9XkwcI",
                callbackURL: "/auth/twitter",
            },
            function (token, tokenSecret, profile, cb) {
                return cb(null, profile);
            }
        )
    );

    passport.serializeUser(function (user, callback) {
        callback(null, user);
    });

    passport.deserializeUser(function (obj, callback) {
        callback(null, obj);
    });

    app.get("/auth/twitter", passport.authenticate("twitter"));

    app.post("/auth/twitter/callback", passport.authenticate("twitter", {
            successRedirect: "/success",
            failureRedirect: "http://localhost:3000/profile",
        }),
        function (req, res) {
            res.redirect("http://localhost:3000/");
        }
    );

    app.get("/auth/twitter", (req, res) => {
        sessionsModel.findOne({}, {}, { sort: { 'expires' : -1 } }, function(err, session) {
            let new_userTwitter = new userTwitter({
                idUser: session.session._id,
                token: req.session.passport.user.id
            });

            userTwitter.findOne({ idUser: session.session._id }, (error, userT) => {
                if (!userT) {
                    new_userTwitter.save((error, uT) => {
                        if (error) {
                            res.status(400);
                            console.log({ message: "Incomplete request" });
                        } else {
                            res.status(201);
                            console.log({ message: "User Twitter created" });
                        }
                    });
                } else {
                    userTwitter.updateOne({idUser: session.session._id}, {token: req.session.passport.user.id}, { new: true }, (error) => {
                        if (error) {
                            res.status(400);
                            console.log({ message: "Don't update" })
                        } else {
                            res.status(200);
                            console.log({ message: "User Twitter updated" })
                        }
                    })
                }
            });
        });
        res.redirect("http://localhost:3000/user");
    });
};
