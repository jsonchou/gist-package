var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var topicSchema = new Schema({
    tag: { type: String },
    user_name: { type: String },//作者ID
    title: { type: String },
    content: { type: String },
    hit: { type: Number, default: 0 },
    create_time: { type: Date, default: Date.now, index: true },
    update_time: { type: Date, default: Date.now },//最后回复的用户时间
    update_user: { type: String },//最后回复的用户
    words: { type: String }//关键字,逗号分隔
}, { 'collections': 'topics' });

exports.Topic = mongoose.model('topics', topicSchema);
