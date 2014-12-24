var express = require('express');
var router = express.Router();
var config = require('../config.js');//数据配置文件
var mongoose = require('mongoose');
var mongoHelper = require('../dao/mongohelper');

var models = require('./../models/models');
var msgModel = new mongoHelper(models.Msg);
 
// mongoose 链接
var db = mongoose.connect(config.db.host);

/* GET home page. */
router.get('/', function (req, res) {
    
    msgModel.getAll(function (err, docs) {
        console.log('####################---' + new Date().getMinutes());
        res.render('index', { msgs: docs });
        console.log('####################');
    });
     
    //console.log('####################' + new Date().getMinutes());
    //console.log(docs);
    //console.log('####################');


});

module.exports = router;
