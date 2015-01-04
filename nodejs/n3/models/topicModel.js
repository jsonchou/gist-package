var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var topicSchema = new Schema({
    tag: { type: String },
    user_id: { type: mongoose.Schema.ObjectId, ref: 'users' },//外链ID
    title: { type: String },
    content: { type: String },
    hit: { type: Number, default: 0 },
    create_time: { type: Date, default: Date.now, index: true },
    update_time: { type: Date, default: Date.now },//最后回复的用户时间
    update_user: { type: String },//最后回复的用户
    words: { type: String }//关键字,逗号分隔
}, { 'collections': 'topics' });

topicSchema.statics = {
    getUserByTopicId: function (TopicId, callback) {
        return this.findOne({ _id: TopicId }).populate('user_id').exec(callback);
    }
}

exports.Topic = mongoose.model('topics', topicSchema);
