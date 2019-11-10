const mongoose = require('mongoose');
var Schema = mongoose.Schema({
    DevAddr: String,
    operation: String,
    payload: Object,
    timestamp: Number
});
module.exports = Schema;
