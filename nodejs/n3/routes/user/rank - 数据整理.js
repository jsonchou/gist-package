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
        },
        two: function (callback) {
            async.eachSeries(json.users, function (item, callbackExt) {
                userIds.push(item._id);
                callbackExt();
            }, function (err) {
                callback(null, []);
            });
        },
        three: function (callback) {
            async.eachSeries(userIds, function (item,callbackExt) {
                topicModel.model.find({ user_info: item }).select('user_info').exec(function (err, models) {
                    userData.push({ '_id': item, 'topic_count': models.length });
                    callbackExt();
                });
            }, function (err) {
                callback(null, []);
            });
        },
        four: function (callback) {
            async.eachSeries(userData, function (item, callbackExt) {
                userModel.update({ _id: item._id }, { topic_count: item.topic_count }, {}, function (err, numAffected) {
                    callbackExt();
                });
            }, function () {
                callback(null, []);
            });
        }
    }, function (err, results) {
        res.locals.dateFormat = jc.dateFormat;
        res.locals.getUrlStyle = jc.getUrlStyle;
        res.render('user/rank', json);
    });
});

module.exports = router;
