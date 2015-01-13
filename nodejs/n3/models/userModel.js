var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    user: { type: String, length: 30 },//用户名不可相同
    email: { type: String, length: 30, unique: true },
    pwd: { type: String },
    avator: { type: String, default: '' },
    create_time: { type: Date, default: Date.now, index: true }
}, { 'collections': 'users' });

exports.User = mongoose.model('users', userSchema);
