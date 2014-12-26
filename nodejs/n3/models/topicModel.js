var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var topicSchema = new Schema({
    cate_id: { type: String },
    user_id: { type: String },//作者ID
    title: { type: String },
    content: { type: String },
    tag: { type: String },
    create_time: { type: Date, default: Date.now, index: true },
    update_time: { type: Date, default: Date.now }
}, { 'collections': 'topics' });

exports.Topic = mongoose.model('topics', topicSchema);
