var express = require('express');
var router = express.Router();

var auth = require('../../services/auth');

var mongoHelper = require('../../dao/mongoHelper');
var comment = require('../../models/commentModel').Comment;
var commentModel = new mongoHelper(comment);

/* GET users listing. */
router.post('/', function (req, res) {
    auth.authorize(req, res, function () {
        var topicid = req.body.topicid;//
        var username = req.body.username;
        var content = jc.saveWords(req.body.editorValue);

        var data = {
            _topic_id: topicid,
            user_name: username,
            content: content
        }

        commentModel.create(data, function (err) {
            if (err) {
                res.send(err);
            }
            res.redirect('/topic/' + topicid);
        });
    });
});

module.exports = router;
