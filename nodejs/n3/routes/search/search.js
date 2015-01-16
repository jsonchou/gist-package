var express = require('express');
var router = express.Router();

var authAdmin = require('../../services/authAdmin');

var mongoHelper = require('../../dao/mongohelper');
var topic = require('../../models/topicModel').Topic;
var topicModel = new mongoHelper(topic);

/* GET users listing. */
router.get('/', function (req, res) {

    var ps = config.site.pageSize;//每页数量
    var pn = parseInt(req.query.page);
    var q = req.query.q;

    if (!q) {
       var backUrl= req.header('Referer') || '/';
       res.redirect(backUrl);
    }

    if (!pn) {
        pn = 1;
    }

    var json = {
        topics: [],
        searchtag: '',
        topic_currentNum: pn,
        topic_records: 0,
        topic_recordSize: 0,
        paginationNode: '',
        isAdmin: false,
        isUser: false,
        title: "Node.js专业中文社区"
    }

    json.isAdmin = authAdmin.isAdmin(req, res);
    json.searchtag = q;
    json.title = "您搜索的关键字：" + json.searchtag;

    var cfg = {
        title: { $regex: q }
    };

    //性能特别低
    topicModel.model.find(cfg, {}, {}, function (err, models) {
        json.topic_records = models.length;
        var rsize = '' + (json.topic_records / ps);
        json.topic_recordSize = (rsize.indexOf('.') > -1) ? parseInt(rsize.split('.')[0]) + 1 : rsize;

        var pspec = 5;//页码间隔数

        var sb = [];
        sb.push("<ul>");

        var rs = json.topic_recordSize;//记录页数
        if (rs >= 1 && rs <= pspec) {
            for (var i = 0; i < rs; i++) {
                sb.push("<li " + ((pn == i + 1) ? "class='disabled active' " : "") + " ><a href='/search/?q=" + q + "&page=" + (i + 1) + "'>" + (i + 1) + "</a></li>");
            }
        } else {
            if (rs > pspec) {
                if (pn < pspec - 1) {//当前页数 ~~ 页码间隔数
                    for (var i = 0; i < pspec; i++) {
                        sb.push("<li " + ((pn == i + 1) ? "class='disabled active' " : "") + " ><a href='/search/?q=" + q + "&page=" + (i + 1) + "'>" + (i + 1) + "</a></li>");
                    }
                    sb.push("<li><a>...</a></li>");
                    sb.push("<li><a href='/?page=" + rs + "'>»</a></li>");
                } else if (pn >= pspec - 1 && pn < rs - 2) {
                    sb.push("<li><a href='/?page=1'>«</a></li>");
                    sb.push("<li><a>...</a></li>");
                    for (var i = pn - 2; i <= pn + 2; i++) {
                        sb.push("<li " + ((pn == i) ? "class='disabled active' " : "") + " ><a href='/search/?q=" + q + "&page=" + (i) + "'>" + (i) + "</a></li>");
                    }
                    sb.push("<li><a>...</a></li>");
                    sb.push("<li><a href='/?page=" + rs + "'>»</a></li>");
                }
                else {
                    sb.push("<li><a href='/?page=1'>«</a></li>");
                    sb.push("<li><a>...</a></li>");
                    for (var i = rs - 4; i <= rs; i++) {
                        sb.push("<li " + ((pn == i) ? "class='disabled active' " : "") + " ><a href='/search/?q=" + q + "&page=" + i + "'>" + i + "</a></li>");
                    }
                }

            }
        }

        sb.join('</ul>')

        json.paginationNode = sb.join('');


        topicModel.model.find(cfg).skip((pn - 1) * ps).limit(ps).sort({ 'top': -1, 'good': -1, 'create_time': -1 }).populate('user_info').exec(function (err, topicsJoin) {
            if (err) {
                jc.log(err);
            }
            json.topics = topicsJoin;

            res.locals.dateFormat = jc.dateFormat;
            res.locals.getUrlStyle = jc.getUrlStyle;
            res.render('search/index', json);
        });

    });


});

module.exports = router;
