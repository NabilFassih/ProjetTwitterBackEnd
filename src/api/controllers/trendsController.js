const mongoose = require('mongoose');
const Trends = require('../models/trendsModel');

// Function to get top tweet stored in our database and sort it by cities
exports.getTweetFromDb = (req, res) => {

    var date = new Date();
    date.setDate(date.getDate()-5);

    Trends.find({created_at: {$gt: date}}, null, {sort: { volumeTweet : 'desc' }}, (error, trends) => {
        var array = {};

        if (error) {
            res.status(500);
            res.json({ message: "Server error" })
        } else {
            for (let i = 0; i < trends.length; i++) {
                if (array[trends[i].city] === undefined) {
                    array[trends[i].city] = [trends[i]];
                    

                } else {
                    array[trends[i].city].push(trends[i]);
                }
            }
            res.status(200);
            res.json(array);
        }
    });
}