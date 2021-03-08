const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userTwitterSchema = new Schema ({
    idUser:{
        type: String,
        required: true
    },
    token:{
        type: String,
        required: true
    },
});

mongoose.model('UserTwitter', userTwitterSchema);
module.exports = mongoose.model('UserTwitter');