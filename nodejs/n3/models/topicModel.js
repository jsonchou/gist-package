var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var topicSchema = new Schema({
    tag: { type: String },//分类
    user_info: { type: mongoose.Schema.ObjectId, ref: 'users' },//外链ID
    title: { type: String, trim: true },
    content: { type: String, trim: true },
    top: { type: Boolean, default: false, index: true }, // 置顶帖
    good: { type: Boolean, default: false }, // 精华帖
    hit: { type: Number, default: 0 },
    comment_count: { type: Number, default: 0 },//回复数量
    create_time: { type: Date, default: Date.now, index: true },
    update_time: { type: Date, default: Date.now },//最后回复的用户时间
    update_user: { type: String },//最后回复的用户
    words: { type: String, trim: true }//关键字,逗号分隔
}, { 'collections': 'topics' });

topicSchema.statics = {
    getUserByTopicId: function (TopicId, callback) {
        return this.findOne({ _id: TopicId }).populate('user_info').exec(callback);
    },
    getTagCn: function (tag,callback) {
        var tabs = config.tab;
        return tabs[tag];
    }
}

topicSchema.virtual('tagName').get(function () {
    return config.tab[this.tag];
});


exports.Topic = mongoose.model('topics', topicSchema);
