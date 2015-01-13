﻿var express = require('express');
var router = express.Router();

var auth = require('../../services/auth');

var mongoHelper = require('../../dao/mongoHelper');
var comment = require('../../models/commentModel').Comment;
var commentModel = new mongoHelper(comment);

var topic = require('../../models/topicModel').Topic;
var topicModel = new mongoHelper(topic);

/* GET users listing. */
router.post('/', function (req, res) {
    auth.authorize(req, res, function () {
        var topicid = req.body.topicid;//
        var user_info = req.cookies.user.split('|')[0];//user id
        var content = jc.saveWords(req.body.editorValue);

        var data = {
            topic_info: topicid,
            user_info: user_info,
            content: content
        }

        commentModel.create(data, function (err) {
            if (err) {
                res.send(err);
            }

            //更新回复数量
            topicModel.update({ _id: topicid }, { $inc: { comment_count: 1 } }, {}, function (error, numAffected) {
                res.redirect('/topic/' + topicid);
            });
            
        });
    });
});

module.exports = router;
