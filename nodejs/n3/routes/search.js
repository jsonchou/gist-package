var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res) {
    var q = req.param('q');
    if (q) {
        res.render('search', { title: '搜索' + q + '的结果页', tag: req.param('q') });
    } else {
        res.render('search', { title: '搜索', tag: '' });
    }
});

module.exports = router;
