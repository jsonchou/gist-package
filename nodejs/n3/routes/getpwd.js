var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res) {
    res.render('getpwd', { title: '获取密码' });
});

module.exports = router;
