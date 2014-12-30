var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res) {
    var q = req.param('q');
    if (q) {
        res.render('topic', { title: '文章' + q + '的结果页', tag: req.param('q') });
    } else {
        res.render('topic', { title: '文章', tag: '' });
    }
});

module.exports = router;
