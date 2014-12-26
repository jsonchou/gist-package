var express = require('express');
var router = express.Router();

var config = require('../config.js');//数据配置文件
var mongoose = require('mongoose');
var mongoHelper = require('../dao/mongohelper');

var user = require('./../models/userModel').User;
var userModel = new mongoHelper(user);

// mongoose 链接

/* GET users listing. */
router.get('/', function (req, res) {
    res.render('signin', { title: '登录' });
});

router.post('/', function (req, res) {
    var email = req.body.email;
    var pwd = req.body.pwd;

    userModel.getAll(function (err, docs) {
        console.log('####################---' + new Date().getMinutes());
        res.render('signin', { user: docs });
        console.log('####################');
    });
});

    

module.exports = router;
