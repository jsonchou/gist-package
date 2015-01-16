var express = require('express');
var crypto = require('crypto');
var router = express.Router();
var mongoHelper = require('../../dao/mongoHelper');

var auth = require('../../services/auth');

var user = require('../../models/userModel').User;
var userModel = new mongoHelper(user);

/* GET users listing. */
router.get('/', function (req, res) {

    if (auth.isLogin(req, res)) {
        res.redirect('/');//已登录，回到首页
    }
    
    var json = {
        title: '登录',
        msg: '',
        reurl: ''
    }
    if (req.query.reurl) {
        json.reurl = req.query.reurl;
    }
    
    res.render('user/signin', json);
});

router.post('/', function (req, res) {
    var en = req.body.email_name;
    var pwd = req.body.pass;
    var reurl = req.query.reurl;

    var md5 = crypto.createHash('md5');
    md5.update(pwd);

    var data = {
        $or: [{ email: en }, { user: en }],
        pwd: md5.digest('hex')
    }

    userModel.getByQuery(data, {}, {}, function (error, models) {

        if (models && models.length > 0) {
            //jc.log(models);
            //登录成功

            //cookie保存用户状态

            //var ex = 3600000 * 24 * parseInt(config.site.cookieAge);//默认7天过期
            //res.cookie('user', models[0]._id + '|' + models[0].user + '|' + models[0].email, { path: '/', expires: new Date(Date.now() + ex), maxAge: ex }); //7天

            //存入session 用户信息
            var userInfo = models[0];
            req.session.userInfo = userInfo;

            //+1积分
            userModel.update({ _id: userInfo._id }, { $inc: { score: 1, comment_count: 1 } }, {}, function (err, numEffect) {
                req.session.userInfo.score += 1;
                if (reurl) {
                    res.redirect(reurl);//登录成功，回到首页
                } else {
                    res.redirect('/');//登录成功，回到首页
                }
            });
            
        } else {
            var json = {
                title: '登录',
                reurl:'',
                msg: '* 账号密码不正确，请重新登录'
            };
            res.render('user/signin', json);
        }

    });
});

module.exports = router;
