var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema({
    topic_info: Schema.Types.ObjectId,//文章ID
    user_info: { type: mongoose.Schema.ObjectId, ref: 'users' },//外链ID
    content: { type: String },
    create_time: { type: Date, default: Date.now, index: true }
},
    { 'collections': 'comments' });

exports.Comment = mongoose.model('comments', commentSchema);
