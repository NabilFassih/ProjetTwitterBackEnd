const mongoose = require('mongoose');
const userTwitter = require('../models/userTwitter');
const Twitter = require("../../twitter");

// Function to create a twitter user
exports.createUserTwitter = (req, res) => {

    let new_userTwitter = new userTwitter(req.body);
    try {
        new_userTwitter.save((error, userTwitter) => {
            if (error) {
                res.status(400);
                res.json({ message: "Incomplete request" });
            } else {
                res.status(201);
                res.json(userTwitter);
            }
        })
    }
    catch (e) {
        res.status(500);
        res.json({ message: "Server error" });
    }
};

// Function to get one twitter user
exports.getUserTwitter = (req, res) => {
    try {
        userTwitter.findOne({idUser: req.params.idUser}, (error, userTwitter) => {
            if (error) {
                res.status(404);
                res.json({ message: "Twitter user not found" });
            }
            else {
                
                res.status(200);
                res.json(userTwitter);
            }
        })
    } catch (e) {
        res.status(500);
        console.log(e);
        res.json({ message: "Server error" });
    }
};


//Function to get Tweets by user id
exports.fetchTweetsByUserId = (req, res) => {
    Twitter.get('statuses/user_timeline', { user_id: req.params.idUser, count: 50 })
    .then((result) => {
        const data = result.map((userData) => {
            return {
                userTwitterId: userData.id,
                name: userData.user.name,
                screen_name: userData.user.screen_name,
                text: userData.text,
                dateTweet: userData.created_at.replace("+0000 ", "") + " UTC",
                avatar: userData.user.profile_image_url
            };
        });
        res.status(200);
        res.send(data);
    })
    .catch((err) => {
        console.log('ERROR :', err);
    })
}