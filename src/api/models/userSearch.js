const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSearchSchema = new Schema({
    idUser: {
        type: String,
        required: true
    },
    nameSearch: {
        type: String,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
});

mongoose.model('UserSearch', userSearchSchema);

module.exports = mongoose.model('UserSearch');