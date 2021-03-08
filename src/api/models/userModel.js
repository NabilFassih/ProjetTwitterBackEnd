const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema ({

    username:{
        type: String,
        required: true
    },

    password:{
        type: String,
        required: true
    },

    lastname:{
        type: String,
        required: true
    },

    firstname:{
        type: String,
        required: true
    },

    role:{
        type: String,
        required: true
    }

});

mongoose.model('User', userSchema);
module.exports = mongoose.model('User');