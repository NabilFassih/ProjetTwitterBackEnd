const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let sessionSchema = new Schema ({
    session:{
        type: Object
    }
});

mongoose.model('Session', sessionSchema);
module.exports = mongoose.model('Session');