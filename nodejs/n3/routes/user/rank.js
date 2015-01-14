var express = require('express');
var router = express.Router();

var authAdmin = require('../../services/authAdmin');

var mongoHelper = require('../../dao/mongohelper');

var topic = require('../../models/topicModel').Topic;
var topicModel = new mongoHelper(topic);

var user = require('../../models/userModel').User;
var userModel = new mongoHelper(user);

var async = require('async');

/* GET users listing. */
router.get('/', function (req, res) {
    var json = {
        title: '用户花名册',
        users: [],
    }

    var username = req.params.username;

    var userIds = [];
    var userData = [];

    //数据整理
    async.series({
        one: function (callback) {
            userModel.model.find().sort({score:-1}).skip(0).limit(100).exec(function (err, uModels) {
                json.users = uModels;
                callback(err, uModels);
            });
        }
    }, function (err, results) {
        res.locals.dateFormat = jc.dateFormat;
        res.locals.getUrlStyle = jc.getUrlStyle;
        res.render('user/rank', json);
    });
});

module.exports = router;
