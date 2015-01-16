var express = require('express');
var crypto = require('crypto');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var mongoHelper = require('../../dao/mongoHelper');
var multer = require('multer');

var user = require('../../models/userModel').User;
var userModel = new mongoHelper(user);

var emailPoster = require("../../services/email");
// mongoose 链接

router.get('/', function (req, res) {

    var json = {
        title: '注册',
        msg: ''
    }
    res.render('user/signup', json);

});

router.post('/', function (req, res) {

    var username = decodeURIComponent(req.body.username);
    var email = req.body.email;
    var pwd = req.body.pwd;
    var repwd = req.body.repwd;
    var avator = "";

    var avatorFile = req.files.cusAvator;

    if (avatorFile) {

    } else {
        avator = req.body.avator;
    }

    var json = {
        title: '注册',
        msg: ''
    }

    if (!repwd || !pwd || !email || !username) {
        json.msg = '请正确填写您的信息';
        res.status(500).render('user/signup', json);
    }
    else {
        if (pwd != repwd) {
            json.msg = '确认密码不正确';
            res.status(500).render('user/signup', json);
        } else {
            userModel.getByQuery({ email: email }, {}, {}, function (error, models) {
                if (models && models.length > 0) {
                    //判断用户邮箱
                    json.msg = '用户邮箱“' + email + '”已注册';
                    res.status(500).render('user/signup', json);
                } else {
                    //判断用户名
                    userModel.getByQuery({ user: username }, {}, {}, function (error, models) {
                        if (models && models.length > 0) {
                            json.msg = '用户名称“' + username + '”已注册';
                            res.status(500).render('user/signup', json);
                        } else {
                            var md5 = crypto.createHash('md5');
                            md5.update(pwd);

                            var data = {
                                user: username,
                                email: email,
                                avator: avator,
                                pwd: md5.digest('hex')
                            }

                            //发送邮件
                            var poster = new emailPoster(config.email.email, data.email, '悠哉网账户--用户注册', '新用户：' + data.user + ",(邮箱：" + data.email + ")您好，悠哉网欢迎您！");
                            poster.send();

                            if (avatorFile) {
                                var newName = Date.now() + Math.floor(Math.random() * 0x10000);//新文件名
                                var extension = avatorFile.extension;

                                if (config.site.imgType.indexOf(extension) > -1) {
                                    data.avator = (config.site.avatorPath + '/' + avatorFile.name).replace('./public', '');
                                } else {
                                    jc.log('不允许上传该格式的图片');
                                }
                            }

                            userModel.create(data, function (err) {
                                //+5积分
                                userModel.update({ user: username }, { $inc: { score: 5, comment_count: 1 } }, {}, function (err, numEffect) {
                                    res.redirect('/signin');
                                });
                            });
                        }
                    });
                }
            });
        }
    }
});

module.exports = router;
