var express = require('express');
var router = express.Router();

var auth = require('../../services/auth');
var authAdmin = require('../../services/authAdmin');

var mongoHelper = require('../../dao/mongoHelper');
var topic = require('../../models/topicModel').Topic;
var topicModel = new mongoHelper(topic);

/* GET users listing. */
router.post('*', function (req, res) {

    var id = req.url.replace('/', '');//获取ID

    auth.authorize(req, res, function () {
        var user = req.cookies.user;

        var title = req.body.title;
        var content = jc.saveWords(req.body.editorValue);
        var tag = req.body.tab;
        var words = req.body.words.replace('，', ',').replace('｜', ',').replace(' ', '');
        var user_info = req.body.user_info;

        
        var data = {
            tag: tag,
            title: title,
            content: content,
            words: words.toLowerCase(),
            user_info: user.split('|')[0],
            update_user: user.split('|')[1]
        }

        if (id) {
            
            data._id = id;
            data.update_time = new Date().toISOString();

            if (authAdmin.isAdmin || user.split('|')[0] == user_info) {
                topicModel.update({ _id: id }, data, {}, function (err, numEffect) {
                    res.redirect('/topic/' + id);
                });
            } else {
                res.redirect('/topic/' + id);
            }
        } else {
            topicModel.create(data, function (err) {
                res.redirect('/');
            });
        }

    });
});


/* GET users listing. */
router.get('*', function (req, res) {

    var user = req.cookies.user;
    var id = req.url.replace('/', '');//获取ID
    var username = user.split('|')[1];

    var json = {
        title: '发布话题',
        msg: '',
        model: {},
        tabs: {}
    };

    json.tabs = config.tab;

    if (id) {
        json.title = '修改话题';
        auth.authorize(req, res, function () {
            topicModel.getById(id, function (err, tModel) {
                if (tModel) {
                    if (tModel.user == username) {
                        json.model = tModel;
                        res.render('topic/post', json);
                    } else {
                        authAdmin.authorize(req, res, function () {
                            json.model = tModel;
                            res.render('topic/post', json);
                        });
                    }
                } else {
                    res.redirect('/');
                }
            });
        });
    } else {
        res.render('topic/post', json);
    }

});

module.exports = router;
