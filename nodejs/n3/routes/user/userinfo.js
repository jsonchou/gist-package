var express = require('express');
var crypto = require('crypto');
var router = express.Router();
var mongoose = require('mongoose');
var util = require('../../services/util');
var jc = new util();
var mongoHelper = require('../../dao/mongoHelper');
var emailPoster = require("../../services/email");
var user = require('../../models/userModel').User;
var userModel = new mongoHelper(user);

var config = require("../../config");

/* GET users listing. */
router.get('/', function (req, res) {
    var json = {
        msg: '',
        title: '修改信息'
    }

    json.email = req.cookies.user || '';

    if (!json.email) {
        res.redirect('/signin');//没有登录，则返回登录页面
    }

    res.render('userinfo', json);
});

router.post('/', function (req, res) {

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
        msg: ''
    }

    json.email = email;

    if (!repwd || !pwd || !oldpwd || !email) {
        json.msg = '请正确填写您的信息';
        res.status(500).render('userinfo', json);
    }
    else {
        if (pwd != repwd) {
            json.msg = '确认密码不正确';
            res.status(500).render('userinfo', json);
        }
        else {

            var data = {
                email: email,
                pwd: oldMd5.digest('hex')//旧密码
            }

            userModel.getByQuery(data, {}, {}, function (error, models) {
                if (models) {
                    //查找到当前用户信息

                    var data = {
                        pwd: md5.digest('hex')//新密码
                    }

                    userModel.update({ email: email }, data, {}, function (err) {
                        if (!err) {
                            json.msg = '用户信息修改成功';
                            res.render('userinfo', json);

                            //发送邮件
                            var poster = new emailPoster(config.email.from, data.email, '悠哉网账户--信息修改', '您的密码已修改成功');
                            poster.send();
                            

                        } else {
                            jc.log(err);
                        }
                    });
                } else {
                    json.msg = '原始密码不正确';
                    res.status(500).render('userinfo', json);
                }
            });
        }
    }

});



module.exports = router;
