var express = require('express');
var router = express.Router();
var config = require('../config.js');//数据配置文件
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
        title:"Node js index"
    }
    topicModel.getAll(function (err, docs) {
        console.log('####################---' + new Date().getMinutes());
        json.topics = docs;
        res.render('index', json);
        console.log('####################');
    });
     
});

module.exports = router;
