const cron = require("node-cron");
const Twitter = require("./twitter");
const Trends = require('./api/models/trendsModel');

// Function to get top tweet of cities from twitter api and store it in our database
exports.getTopTweet = () => {
    cron.schedule("*/10 * * * *", () => { 
    
        let resultat;
        let cities = [
            {
                name: "Paris",
                id: 615702
            },
            {
                name: "Los angeles",
                id: 2442047
            },
            {
                name: "New York",
                id: 2459115
            },
            {
                name: "Londres",
                id: 44418
            },
            {
                name: "Rio de Janeiro",
                id: 455825
            },
            {
                name: "Dubai",
                id: 1940345
            },
            {
                name: "Tokyo",
                id: 1118370
            },
        ];
        
        for (let i = 0; i < cities.length; i++) {
            resultat = Twitter.get('trends/place', {id: cities[i].id, count: 10})
                .then((result) => {
                    for (let j = 0; j < result[0].trends.length; j++) {
                        if (result[0].trends[j].tweet_volume) {
                            let newTrends = new Trends({
                                'libelleTweet': result[0].trends[j].name,
                                'volumeTweet': result[0].trends[j].tweet_volume,
                                'city': cities[i].name,
                                'woeid': cities[i].id,
                            });
            
                            newTrends.save((error, trends) => {
                                if (error) {
                                    console.log('errorFlag')
                                } else {
                                    console.log('Insert Trends');
                                }
                            })
                        }
                    }
    
                    return result;
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    });
};