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
        tabs: {},
        tabKey: '',
        isAdmin: false,
        isUser:false,
        title: "Uzai Nodejs Site"
    }

    var user = req.cookies.user;
    if (user) {
        var username = user.split('|')[1];
        if (config.site.admin.indexOf(username) > -1) {
            json.isAdmin = true;
        }
    }

    var tab = req.query.tab;
    var cfg = {};
    if (tab) {
        if (tab == 'good') {
            cfg = { 'good': true }
        } else {
            cfg = { 'tag': tab }
        }
        json.tabKey = tab;
    }

    topicModel.model.find(cfg).sort({ 'top': -1, 'good': -1, 'create_time': -1 }).populate('user_info').exec(function (err, topicsJoin) {
        if (err) {
            jc.log(err);
        }
        json.topics = topicsJoin;
        json.tabs = config.tab;

        res.locals.dateFormat = jc.dateFormat;
        res.locals.getUrlStyle = jc.getUrlStyle;
        res.render('index', json);

    });
     
});

module.exports = router;
