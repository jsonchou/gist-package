var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    console.log(req);

    var phone=req.param('phone');
    var content=req.param('content');
    var email=req.param('email');


    var mongoose = require('mongoose');
    //链接数据库
    mongoose.connect('mongodb://localhost:27017/');

    var kittySchema = mongoose.Schema({
        phone: String,
        content: String,
        email: String
    });

    //建表
    var Kitten = mongoose.model('Kitten', kittySchema);

    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function callback () {
        // yay!
        var k1 = new Kitten({
            phone:phone,
            content:content,
            email: email
        });
        debugger;
        console.log(k1);
        k1.save(err,function(){
            if (err)
                return console.error(err);
        })
    });

    res.render('postMsg', { status:'your information has been insertd!'});

});

module.exports = router;
