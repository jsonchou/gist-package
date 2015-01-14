var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    user: { type: String, length: 30 },//用户名不可相同
    email: { type: String, length: 30, unique: true },
    pwd: { type: String },
    avator: { type: String, default: '' },
    comment_count: { type: Number, default: 0 },
    topic_count: { type: Number, default: 0 },
    score: { type: Number, default: 0 },
    create_time: { type: Date, default: Date.now, index: true }
}, { 'collections': 'users' });

exports.User = mongoose.model('users', userSchema);
