var express = require('express');
var crypto = require('crypto');
var router = express.Router();
var mongoose = require('mongoose');
var mongoHelper = require('../../dao/mongoHelper');

var user = require('../../models/userModel').User;
var userModel = new mongoHelper(user);

var config = require("../../config");
var emailPoster = require("../../services/email");

var util = require('../../services/util');
var jc = new util();

// mongoose 链接

router.get('/', function (req, res) {

    var json = {
        title: '注册',
        msg: ''
    }
    res.render('signup', json);
 
});

router.post('/', function (req, res) {

    var email = req.body.email
    var pwd = req.body.pwd;
    var repwd = req.body.repwd;

    var md5 = crypto.createHash('md5');
    md5.update(pwd);

    var data = {
        email: email,
        pwd: md5.digest('hex')
    }

    var json = {
        title: '注册',
        msg: ''
    }


    if (!repwd || !pwd || !email) {
        json.msg = '请正确填写您的信息';
        res.status(500).render('signup', json);
    }
    else {
        if (pwd != repwd) {
            json.msg = '确认密码不正确';
            res.status(500).render('signup', json);
        } else {
            userModel.getByQuery({ email: email }, {}, {}, function (error, models) {
                if (models && models.length>0) {
                    json.msg = '用户邮箱' + email + '已注册';
                    res.status(500).render('signup', json);
                } else {
                    userModel.create(data, function (err) {
                        if (!err) {

                            //发送邮件
                            var poster = new emailPoster(config.email.email, data.email, '悠哉网账户--用户注册', '新用户：' + data.email + ",您好，悠哉网欢迎您！");
                            poster.send();

                            res.redirect('/signin');

                        } else {
                            jc.log(err);
                        }
                    });
                }
            });
        }
    }

});

module.exports = router;
