var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    user: { type: String, length: 30 },//用户名可相同
    email: { type: String, length: 30, unique: true },
    pwd: { type: String },
    create_time: { type: Date, default: Date.now, index: true }
}, { 'collections': 'users' });

exports.User = mongoose.model('users', userSchema);
