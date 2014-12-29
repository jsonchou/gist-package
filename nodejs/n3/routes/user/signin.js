var express = require('express');
var crypto = require('crypto');
var router = express.Router();
var mongoose = require('mongoose');
var mongoHelper = require('../../dao/mongoHelper');

var user = require('../../models/userModel').User;
var userModel = new mongoHelper(user);

var config = require('../../config');

// mongoose 链接

/* GET users listing. */
router.get('/', function (req, res) {
    var json = {
        title: '登录',
        msg:''
    }
    res.render('signin', json);
});

router.post('/', function (req, res) {
    var email = req.body.email;
    var pwd = req.body.pass;

    var md5 = crypto.createHash('md5');
    md5.update(pwd);

    var json = { 
        email: email, 
        pwd: md5.digest('hex') 
    }

    userModel.getByQuery(json, {}, {}, function (error, models) {

        if (models&&models.length > 0) {
            //登录成功
            var ex = 3600000 * 24 * parseInt(config.site.cookieAge);//默认7天过期
            res.cookie('user', email, { path: '/', expires: new Date(Date.now() + ex), maxAge: ex }); //7天

            var json = {
                title: '登录',
                user: email,
                topics: [],
                msg:''
            };
            res.render('index', json);//登录成功，回到首页
        } else {
            var json = {
                title: '登录',
                msg: '* 账号密码不相符，请重新登录'
            };
            res.render('signin', json);
        }
    });
});

module.exports = router;
