const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let trendsSchema = new Schema ({
    libelleTweet:{
        type: String,
        required: true
    },
    volumeTweet:{
        type: String,
    },
    city:{
        type: String,
        required: true
    },
    woeid:{
        type: String,
        required: true
    },
    created_at:{
        type: Date,
        default: Date.now
    }
});

mongoose.model('Trends', trendsSchema);
module.exports = mongoose.model('Trends');