var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017');

//生成数据表原型
var msgSchema = mongoose.Schema({
    phone: String,
    content: String,
    email: String,
    date: String
}, { collection: 'msg' });

//建表
var msgModel = mongoose.model('msg', msgSchema);

/* GET home page. */
router.get('/', function(req, res) {

    var phone=req.param('phone');
    var content=req.param('content');
    var email = req.param('email');
    var date = (new Date().getFullYear()) + '-' + (new Date().getMonth() + 1) + '-' + (new Date().getDay());
       
    // yay!
    var msgData = new msgModel({
        phone: phone,
        content: content,
        email: email,
        date:date
    });
     
    msgData.save(function (err) {
        if (err) {
            console.log('##################');
            console.log('error occur');
            console.log('##################');
        }
       
        res.render('postMsg', msgData);
    });
     
});

module.exports = router;
