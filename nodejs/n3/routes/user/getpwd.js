var express = require('express');
var router = express.Router();
var emailPoster = require("../../services/email");
var guid = require('../../services/guid');//生成guid

var crypto = require('crypto');
var mongoose = require('mongoose');
var mongoHelper = require('../../dao/mongoHelper');

var config = require("../../config");

var user = require('../../models/userModel').User;
var userModel = new mongoHelper(user);

/* GET users listing. */
router.get('/', function (req, res) {
    var json = {
        title: '获取密码',
        msg: ''
    }
    res.render('getpwd', json);
});

router.post('/', function (req, res) {

    var data = {
        email:req.body.email
    }
    var json = {
        title: '找回密码',
        msg:''
    }

    userModel.getByQuery(data, {}, {}, function (error, models) {

        if (models.length > 0) {
            //生成guid code
            var code = new guid().render();

            var md5 = crypto.createHash('md5');
            md5.update(code);

            //修改密码
            userModel.update(data, { pwd: md5.digest('hex') }, {}, function (error, numAffected) {
                //发送邮件
                var poster = new emailPoster(config.email.email, data.email, '悠哉网账户--获取密码', '您的新密码为：' + code + ",若有必要，请重新<a href='" + config.site.url + "/userinfo'>修改</a>密码");
                poster.send();

                res.clearCookie('user', { path: '/' });

                json.msg = "请登录您的邮箱：" + data.email + "，找回您的密码";
                res.render('getpwd', json);
            });
             
        } else {
            json.msg = "* 您输入的邮箱不存在，请重新输入";
            res.render('getpwd', json);
        }
    });

});

module.exports = router;

