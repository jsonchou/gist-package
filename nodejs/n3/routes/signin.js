var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res) {
    res.render('signin', { title: '登录' });
});

router.post('/', function (req, res) {
    var email = req.body.email;
    var pwd = req.body.pwd;
    res.render('signin', { email: email, password: pwd });
});

module.exports = router;
