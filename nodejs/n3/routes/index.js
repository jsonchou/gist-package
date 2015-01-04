var express = require('express');
var router = express.Router();
var config = require('../config');//数据配置文件
var mongoose = require('mongoose');
var mongoHelper = require('../dao/mongohelper');

var topic = require('./../models/topicModel').Topic;
var topicModel = new mongoHelper(topic);

// mongoose 链接
var db = mongoose.connect(config.db.host);

/* GET home page. */
router.get('/', function (req, res) {
    
    var json = { 
        topics: [],
        title:"Uzai Nodejs Site"
    }
    topicModel.getAll(function (err, docs) {
        json.topics = docs;
        jc.log(docs);
        res.locals.dateFormat = jc.dateFormat;
        res.render('index', json);
    });
     
});

module.exports = router;
