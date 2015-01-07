var express = require('express');
var router = express.Router();

var mongoHelper = require('../../dao/mongohelper');
var topic = require('../../models/topicModel').Topic;
var topicModel = new mongoHelper(topic);

var authAdmin = require('../../services/authAdmin');

var comment = require('../../models/commentModel').Comment;
var commentModel = new mongoHelper(comment);

//edit
router.get('/:id/:tag', function (req, res) {
    var id = req.params.id;
    var tag = req.params.tag;

    authAdmin.authorize(req, res, function () {
        //管理员权限验证
        topicModel.getById(id, function (err, tModel) {
            if (tModel) {
                if (tag == 'top') {
                    tModel.top = true;
                    topicModel.update({ _id: id }, tModel, {}, function (err, numAffected) {
                        res.json({ 'message': '置顶设置' + '成功' });
                    });
                    res.json({ 'message': '置顶设置' + '成功' });
                } else if (tag == 'good') {
                    tModel.good = true;
                    topicModel.update({ _id: id }, tModel, {}, function (err, numAffected) {
                        res.json({ 'message': '精华设置' + '成功' });
                    });
                } else if (tag == 'del') {
                    topicModel.delete(tModel, function (err) {
                        res.json({ 'message': '删除' + '成功' });
                    });
                } else {
                    res.status(404).redirect('/');//404跳转到首页
                }

            } else {
                res.redirect('/');//404跳转到首页
            }
        });
    });

});

/* GET users listing. */
router.get('/:id', function (req, res) {

    var id = req.params.id;

    topicModel.getById(id, function (err, tModel) {
        if (tModel) {
            //jc.log(model.content);

            var json = {
                title: tModel.title,
                topic: tModel,
                tagCn: '',
                comments: [],
                userInfo: {},
                isLogin: req.cookies.user//判断是否登录
            };

            topicModel.model.getUserByTopicId(tModel._id, function (err, topicJoin) {
                json.userInfo = topicJoin.user_info;
            });

            json.tagCn = topicModel.model.getTagCn(tModel.tag);

            //更新点击量
            topicModel.update({ _id: tModel._id }, { hit: tModel.hit + 1 }, {}, function (error, numAffected) {
                commentModel.model.find({ _topic_id: tModel._id }).sort({ 'create_time': -1 }).populate('user_info').exec(function (err, commentJoin) {
                    if (commentJoin && commentJoin.length > 0) {
                        json.comments = commentJoin;
                        //jc.log(commentJoin);
                    }
                    //jc.log(json);
                    res.locals.dateFormat = jc.dateFormat;
                    res.render('topic/show', json);
                });
            });

        } else {
            res.status(404).redirect('/');//404跳转到首页
        }
    });
});



module.exports = router;
