var express = require('express');
var router = express.Router();
var auth = require('../../services/auth');

var mongoHelper = require('../../dao/mongoHelper');
var topic = require('../../models/topicModel').Topic;
var topicModel = new mongoHelper(topic);

/* GET users listing. */
router.get('/', function (req, res) {
    auth.authorize(req, res, function () {
        var json = {
            title: '发布话题',
            msg: ''
        }
        res.render('topic/post', json);
    });

});

/* GET users listing. */
router.post('/', function (req, res) {

    auth.authorize(req, res, function () {
        var user = req.cookies.user;
       
        var title = req.body.title;
        var content = jc.saveWords(req.body.editorValue);
        var tag = req.body.tab;
        var words = req.body.words.replace('，', ',').replace('｜', ',').replace(' ', '');

        var data = {
            tag: tag,
            title: title,
            content: content,
            words: words,
            user_id: user.split('|')[0],
            update_user: user.split('|')[1]
        }

        jc.log(topicModel);
        topicModel.create(data, function (err) {
            res.redirect('/');
        });
    });
});

module.exports = router;
