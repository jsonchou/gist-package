var express = require('express');
var crypto = require('crypto');
var router = express.Router();
var config = require('../config.js');//数据配置文件
var mongoose = require('mongoose');
var mongoHelper = require('../dao/mongohelper');

var models = require('./../models/userModel');
var userModel = new mongoHelper(models.User);

// mongoose 链接

router.get('/', function (req, res) {

    var json = {
        title: '注册',
        msg: ''
    }
    res.render('signup', json);

    //userModel.getAll(function (err, docs) {
    //    console.log('####################---' + new Date().getMinutes());
    //    res.render('signup', { title: '注册' });
    //    console.log('####################');
    //});

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
                if (models.lenght > 0) {
                    json.msg = '用户邮箱' + email + '已注册';
                    res.status(500).render('signup', json);
                } else {
                    userModel.create(data, function (err) {
                        if (!err) {
                            //res.cookie('user', email, { domain: '.example.com', path: '/', secure: true });
                            //过期时间7天
                            //res.cookie('user', email, { path: '/', expires: new Date(Date.now() + 60*60*24*7), secure: true });
                            json.msg = '用户注册成功';
                            res.render('signup',json);
                        } else {
                            console.log('####################---' + new Date().getMinutes());
                            console.log(err);
                            console.log('####################');
                        }
                    });
                }
            });
        }
    }

});

module.exports = router;
