var express = require('express');
var router = express.Router();

var mongoHelper = require('../../dao/mongohelper');

var topic = require('../../models/topicModel').Topic;
var topicModel = new mongoHelper(topic);

var authAdmin = require('../../services/authAdmin');

var comment = require('../../models/commentModel').Comment;
var commentModel = new mongoHelper(comment);

var user = require('../../models/userModel').User;
var userModel = new mongoHelper(user);

//edit
router.get('/:id/:tag', function (req, res) {
    var id = req.params.id;
    var tag = req.params.tag;

    authAdmin.authorize(req, res, function () {
        //管理员权限验证
        topicModel.getById(id, function (err, tModel) {
            if (tModel) {
                if (tag == 'top') {
                    var ctag = "置顶";
                    if (tModel.top == false) {
                        tModel.top = true;
                    }else{
                        tModel.top = false;
                        ctag = "取消置顶";
                    }
                    topicModel.update({ _id: id }, tModel, {}, function (err, numAffected) {
                        if (ctag.indexOf('取消') <= -1) {
                            req.session.userInfo.score += 100;
                            //置顶
                            userModel.update({ _id: tModel.user_info }, { $inc: { score: 100 } }, {}, function (err, numAffect) {});
                        } 
                        res.json({ 'message': ctag + '设置' + '成功' });
                    });
                } else if (tag == 'good') {
                    var ctag = "精华";
                    if (tModel.good == false) {
                        tModel.good = true;
                    } else {
                        tModel.good = false;
                        ctag = "取消精华";
                    }
                    topicModel.update({ _id: id }, tModel, {}, function (err, numAffected) {
                        if (ctag.indexOf('取消') <= -1) {
                            req.session.userInfo.score += 20;
                            //置顶
                            userModel.update({ _id: tModel.user_info }, { $inc: { score: 20 } }, {}, function (err, numAffect) {});
                        }
                        res.json({ 'message': ctag + '设置' + '成功' });
                    });
                } else if (tag == 'del') {
                    topicModel.delete(tModel, function (err) {
                        userModel.update({ _id: tModel.user_info }, { $inc: { topic_count: -1 } }, {}, function (err, numAffect) {
                            commentModel.delete({ topic_info: id }, function () {
                                res.json({ 'message': '删除' + '成功' });
                            });
                        });
                    });
                } else if (tag.indexOf('cdel') > -1) {
                    //删除点评
                    var cid = tag.split('-')[1];//评论ID
                    commentModel.delete({ _id: cid }, function () {
                        //更新点评数
                        topicModel.update({ _id: id }, { $inc: { comment_count: -1 } }, {}, function (err, numAffect) {
                            userModel.update({ _id: tModel.user_info }, { $inc: { comment_count: -1 } }, {}, function (err, numAffect) {
                                res.json({ 'message': '评论删除' + '成功' });
                            });
                        });
                    });
                }
                else {
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

    var ui = req.session.userInfo;
    var id = req.params.id;
    var userid = "";
    if (ui) {
        userid = ui._id;
    }

    topicModel.getById(id, function (err, tModel) {
        if (tModel) {
            //jc.log(model.content);

            var json = {
                title: tModel.title,
                topic: tModel,
                tagCn: '',
                isAdmin: false,
                isCreator:false,
                comments: [],
                userInfo: {},
                isLogin: ui//判断是否登录
            };

            topicModel.model.getUserByTopicId(tModel._id, function (err, topicJoin) {
                json.userInfo = topicJoin.user_info;
            });

            json.isAdmin = authAdmin.isAdmin(req, res);
            json.isCreator = userid && (tModel.user_info == userid);

            json.tagCn = topicModel.model.getTagCn(tModel.tag);

            //更新点击量
            //$inc 处增加量
            topicModel.update({ _id: tModel._id }, { $inc: { hit:1 } }, {}, function (error, numAffected) {
                commentModel.model.find({ topic_info: tModel._id }).sort({ 'create_time': -1 }).populate('user_info').exec(function (err, commentJoin) {
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
