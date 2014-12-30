var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var topicSchema = new Schema({
    cate_id: Schema.Types.ObjectId,
    user_id: Schema.Types.ObjectId,//作者ID
    title: { type: String },
    content: { type: String },
    tag: { type: String },
    hit: { type: String },
    create_time: { type: Date, default: Date.now, index: true },
    update_time: { type: Date, default: Date.now }
}, { 'collections': 'topics' });

exports.Topic = mongoose.model('topics', topicSchema);
