var express = require('express');
var router = express.Router();

var auth = require('../../services/auth');

var mongoHelper = require('../../dao/mongoHelper');
var comment = require('../../models/commentModel').Comment;
var commentModel = new mongoHelper(comment);

var topic = require('../../models/topicModel').Topic;
var topicModel = new mongoHelper(topic);

var user = require('../../models/userModel').User;
var userModel = new mongoHelper(user);

/* GET users listing. */
router.post('/', function (req, res) {
    auth.authorize(req, res, function () {
        var ui = req.session.userInfo;
        var topicid = req.body.topicid;//
        var user_info = ui._id;//user id
        var content = jc.saveWords(req.body.editorValue);

        var data = {
            topic_info: topicid,
            user_info: user_info,
            content: content
        }

        commentModel.create(data, function (err) {
            if (err) {
                res.send(err);
            } else {
                //更新回复数量
                topicModel.update({ _id: topicid }, { $inc: { comment_count: 1 }, $set: { update_user: ui.user } }, {}, function (error, numAffected) {
                    userModel.update({ _id: data.user_info }, { $inc: { score: 1, comment_count: 1 } }, {}, function (err, numEffect) {
                        req.session.userInfo.score += 1;
                        res.redirect('/topic/' + topicid);
                    });
                });
            }
        });
    });
});

module.exports = router;
