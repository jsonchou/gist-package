var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var cateSchema = new Schema({
    cate_id: { type: Number, default: 0 },//自增列
    name: { type: String }
}, { 'collections': 'cates' });

exports.Cate = mongoose.model('cates', cateSchema);
