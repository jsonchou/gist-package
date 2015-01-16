var express = require('express');
var crypto = require('crypto');
var router = express.Router();

var mongoose = require('mongoose');

var mongoHelper = require('../../dao/mongoHelper');
var emailPoster = require("../../services/email");

var user = require('../../models/userModel').User;
var userModel = new mongoHelper(user);

var auth = require('../../services/auth');

/* GET users listing. */
router.get('/', function (req, res) {
    auth.authorize(req, res, function () {
        var json = {
            msg: '',
            title: '修改信息',
            email: req.session.userInfo.email
        }
        res.render('user/userinfo', json);
    });
});

router.post('/', function (req, res) {

    auth.authorize(req, res, function () {

        var oldpwd = req.body.oldpwd;
        var pwd = req.body.pwd;
        var repwd = req.body.repwd;
        var email = req.body.email;

        var oldMd5 = crypto.createHash('md5');
        oldMd5.update(oldpwd);

        var md5 = crypto.createHash('md5');
        md5.update(pwd);

        var json = {
            title: '修改信息',
            msg: '',
            email: email
        }

        if (!repwd || !pwd || !oldpwd || !email) {
            json.msg = '请正确填写您的信息';
            res.status(500).render('user/userinfo', json);
        }
        else {
            if (pwd != repwd) {
                json.msg = '确认密码不正确';
                res.status(500).render('user/userinfo', json);
            }
            else {

                var data = {
                    email: email,
                    pwd: oldMd5.digest('hex')//旧密码
                }

                userModel.getByQuery(data, {}, {}, function (error, models) {
                    if (models && models.length > 0) {
                        //查找到当前用户信息

                        userModel.update({ email: email }, { pwd: md5.digest('hex') }, {}, function (err) {
                            if (!err) {

                                //发送邮件
                                var poster = new emailPoster(config.email.email, data.email, '悠哉网账户--信息修改', '亲爱的用户' + models[0].user + '，您的密码已修改成功');
                                poster.send();

                                //清除用户cookie
                                //res.clearCookie('user', { path: '/' });

                                //登出
                                auth.signOut(req, res, function () {
                                    //跳转
                                    json.msg = '用户信息修改成功，请重新<a href="/signin">登录</a>';
                                    res.render('user/userinfo', json);
                                });

                            } else {
                                jc.log(err);
                            }
                        });
                    } else {
                        json.msg = '原始密码不正确';
                        res.redirect('user/userinfo');
                    }
                });
            }
        }
    });
});



module.exports = router;
