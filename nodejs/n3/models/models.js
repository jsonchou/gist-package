var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var msgSchema = new Schema({
    phone: String,
    content: String,
    email: String,
    date: { type: Date, default: Date.now }
}, {'collections':'msgs'});

var userSchema = new Schema({
    name: String,
    sex: String,
    age: String
}, { 'collections': 'users' });

exports.Msg = mongoose.model('msgs', msgSchema);
exports.User = mongoose.model('users', userSchema);
