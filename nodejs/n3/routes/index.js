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
    
    topicModel.getAll(function (err, docs) {
        console.log('####################---' + new Date().getMinutes());
        res.render('index', { topics: docs,title:"Node js index" });
        console.log('####################');
    });
     
});

module.exports = router;
