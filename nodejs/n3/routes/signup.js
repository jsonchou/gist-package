var express = require('express');
var router = express.Router();
var config = require('../config.js');//数据配置文件
var mongoose = require('mongoose');
var mongoHelper = require('../dao/mongohelper');

var models = require('./../models/userModel');
var userModel = new mongoHelper(models.User);

// mongoose 链接

router.get('/signup', function (req, res) {

    res.render('signup', { title: '注册' });

    //userModel.getAll(function (err, docs) {
    //    console.log('####################---' + new Date().getMinutes());
    //    res.render('signup', { title: '注册' });
    //    console.log('####################');
    //});

});

router.post('/signup', function (req, res) {

    var email = req.params('email');
    var pwd = req.params('pwd');
    var repwd = req.params('repwd');

    var doc = {
        email: email,
        pwd: repwd
    };

    if (!repwd || !pwd || !email) {
        res.status(500).render('signup', { title: '请正确填写您的信息' });
    } else {
        if (pwd != repwd) {
            res.status(500).render('signup', {  title: '确认密码不正确' });
        } else {
            userModel.getByQuery({ email: email }, [], function (error, model) {
                if (model.lenght > 0) {
                    res.status(500).render('signup', { title: '用户邮箱' + email + '已注册' });
                } else {
                    userModel.create(doc, function (err) {
                        if (!err) {
                            res.render('signup', { title: '用户邮箱' + email + '注册成功' });
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
