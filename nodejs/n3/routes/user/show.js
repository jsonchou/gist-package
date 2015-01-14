var express = require('express');
var router = express.Router();

var authAdmin = require('../../services/authAdmin');

var mongoHelper = require('../../dao/mongohelper');

var topic = require('../../models/topicModel').Topic;
var topicModel = new mongoHelper(topic);

var user = require('../../models/userModel').User;
var userModel = new mongoHelper(user);

var comment = require('../../models/commentModel').Comment;
var commentModel = new mongoHelper(comment);

var async = require('async');

/* GET users listing. */
router.get('/:username', function (req, res) {
    var json = {
        title: '用户信息',
        userInfo: {},
        topics: [],
        commentTopics: [],
    }

    var username = req.params.username;
    var topicIds = [];

    //顺序加载
    async.series({
        one: function (callback) {
            userModel.model.find({ user: username }, {}, {}, function (err, uModels) {
                if (uModels && uModels.length > 0) {
                    json.userInfo = uModels[0];
                    callback(err, uModels);
                } else {
                    res.redirect('/');
                }
            });
        },
        two: function (callback) {
            topicModel.model.find({ user_info: json.userInfo._id }).sort({ 'top': -1, 'good': -1, 'create_time': -1 }).skip(0).limit(5).populate('user_info').exec(function (err, tModels) {
                json.topics = tModels;
                callback(err, tModels);
            });
        },
        three: function (callback) {
            commentModel.model.find({ user_info: json.userInfo._id }).distinct('topic_info').exec(function (err, topicInfoModels) {
                for (var i = 0; i < topicInfoModels.length; i++) {
                    topicIds.push(topicInfoModels[i].topic_info);
                }
                topicIds = jc.arrayUnique(topicInfoModels);
                callback(err, topicInfoModels);
            });
        },
        four: function (callback) {
            topicModel.model.find({ _id: { $in: topicIds } }).sort({ 'top': -1, 'good': -1, 'create_time': -1 }).skip(0).limit(5).populate('user_info').exec(function (err, ctModels) {
                json.commentTopics = ctModels;
                ct = ctModels;
                callback(err, ct);
            });
        }
    }, function (err, results) {
        res.locals.dateFormat = jc.dateFormat;
        res.locals.getUrlStyle = jc.getUrlStyle;
        res.render('user/show', json);
    });
});

router.get('/:username/:tag', function (req, res) {
    var ps = config.site.pageSize;//每页数量
    var pn = parseInt(req.query.page);
    var q = req.query.q;
    var username = req.params.username;
    var tag = req.params.tag;

    var pspec = 5;//页码间隔数

    if (!pn) {
        pn = 1;
    }

    var json = {
        userInfo:{},
        topics: [],
        topic_currentNum: pn,
        topic_records: 0,
        topic_recordSize: 0,
        paginationNode: '',
        isAdmin: false,
        isUser: false,
        title: ""
    }

    json.isAdmin = authAdmin.isAdmin(req, res);

    var cfg = {
        
    };
    
    var urlFix = "user/" + username + "/" + tag;

    var topicIds = [];

    async.series({
        one: function (callback) {
            userModel.model.find({ user: username }, {}, {}, function (err, uModels) {
                if (uModels && uModels.length > 0) {
                    json.userInfo = uModels[0];//用户实体类
                    callback(err, uModels);
                } else {
                    res.redirect('/');
                }
            });
        },
        one_fix: function (callback) {
            if (tag == 'topics') {
                cfg.user_info = json.userInfo._id;//填充查询条件
                callback(null, []);
            } else if (tag == 'replies') {
                commentModel.model.find({ user_info: json.userInfo._id }).distinct('topic_info').exec(function (err, topicInfoModels) {
                    for (var i = 0; i < topicInfoModels.length; i++) {
                        topicIds.push(topicInfoModels[i].topic_info);
                    }
                    topicIds = jc.arrayUnique(topicInfoModels);
                    cfg._id = { $in: topicIds };//填充查询条件
                    callback(err, topicInfoModels);
                });
            }
        },
        two: function (callback) {
            topicModel.model.find(cfg, {}, {}, function (err, allModels) {
                json.topic_records = allModels.length;
                var rsize = '' + (json.topic_records / ps);
                json.topic_recordSize = (rsize.indexOf('.') > -1) ? parseInt(rsize.split('.')[0]) + 1 : rsize;//余数取整
                callback(err, allModels);
            });
        },
        three: function (callback) {
            //生成分页节点;
            var sb = [];
            sb.push("<ul>");
            var rs = json.topic_recordSize;//记录页数
            if (rs >= 1 && rs <= pspec) {
                for (var i = 0; i < rs; i++) {
                    sb.push("<li " + ((pn == i + 1) ? "class='disabled active' " : "") + " ><a href='/" + urlFix + "?page=" + (i + 1) + "'>" + (i + 1) + "</a></li>");
                }
            } else {
                if (rs > pspec) {
                    if (pn < pspec - 1) {//当前页数 ~~ 页码间隔数
                        for (var i = 0; i < pspec; i++) {
                            sb.push("<li " + ((pn == i + 1) ? "class='disabled active' " : "") + " ><a href='/" + urlFix + "?page=" + (i + 1) + "'>" + (i + 1) + "</a></li>");
                        }
                        sb.push("<li><a>...</a></li>");
                        sb.push("<li><a href='/?page=" + rs + "'>»</a></li>");
                    } else if (pn >= pspec - 1 && pn < rs - 2) {
                        sb.push("<li><a href='/?page=1'>«</a></li>");
                        sb.push("<li><a>...</a></li>");
                        for (var i = pn - 2; i <= pn + 2; i++) {
                            sb.push("<li " + ((pn == i) ? "class='disabled active' " : "") + " ><a href='/" + urlFix + "?page=" + (i) + "'>" + (i) + "</a></li>");
                        }
                        sb.push("<li><a>...</a></li>");
                        sb.push("<li><a href='/?page=" + rs + "'>»</a></li>");
                    }
                    else {
                        sb.push("<li><a href='/?page=1'>«</a></li>");
                        sb.push("<li><a>...</a></li>");
                        for (var i = rs - 4; i <= rs; i++) {
                            sb.push("<li " + ((pn == i) ? "class='disabled active' " : "") + " ><a href='/" + urlFix + "?page=" + i + "'>" + i + "</a></li>");
                        }
                    }
                }
            }
            sb.join('</ul>')

            json.paginationNode = sb.join('');
            callback(null, []);
        },
        four: function (callback) {
            topicModel.model.find(cfg).skip((pn - 1) * ps).limit(ps).sort({ 'top': -1, 'good': -1, 'create_time': -1 }).populate('user_info').exec(function (err, topicsJoin) {
                if (err) {
                    jc.log(err);
                }
                json.topics = topicsJoin;
                callback(err, topicsJoin);
            });
        }
    }, function (err, results) {
        res.locals.dateFormat = jc.dateFormat;
        res.locals.getUrlStyle = jc.getUrlStyle;
        if (tag == 'topics') {
            json.title = username + "创建的话题";
        } else if (tag == 'replies') {
            json.title = username + "参与的话题";
        }
        res.render('user/show_list', json);
    });
  
});

module.exports = router;
