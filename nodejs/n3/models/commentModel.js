var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema({
    topic_id: Schema.Types.ObjectId,//文章ID
    user_id: Schema.Types.ObjectId,//用户ID
    content: { type: Schema.Text },
    date: { type: Date, default: Date.now } , 
    create_time: {type: Date, default: Date.now, index: true}, 
    update_time: { type: Date, default: Date.now }
},
    { 'collections': 'comments' });

exports.Comment = mongoose.model('comments', commentSchema);
