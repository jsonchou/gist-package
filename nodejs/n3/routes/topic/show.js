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
                    var ctag = "置顶";
                    if (tModel.top == false) {
                        tModel.top = true;
                    }else{
                        tModel.top = false;
                        ctag = "取消置顶";
                    }
                    topicModel.update({ _id: id }, tModel, {}, function (err, numAffected) {
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
                        res.json({ 'message': ctag + '设置' + '成功' });
                    });
                } else if (tag == 'del') {
                    topicModel.delete(tModel, function (err) {
                        res.json({ 'message': '删除' + '成功' });
                    });
                } else if (tag.indexOf('cdel') > -1) {
                    //删除点评
                    var cid=tag.split('-')[1];//评论ID
                    commentModel.delete({ _id: cid }, function () {
                        tModel.comment_count -= 1;//更新点评数
                        topicModel.update({ _id: id }, tModel, {}, function (err, numAffected) {
                            res.json({ 'message': '评论删除' + '成功' });
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

    var id = req.params.id;
    var user = req.cookies.user;
    var userid = "";
    if (user) {
        userid = user.split('|')[0];
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
                isLogin: req.cookies.user//判断是否登录
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
