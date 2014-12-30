var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res) {
    var q = req.param('q');
    if (q) {
        res.render('comment', { title: '评论' + q + '的结果页', tag: req.param('q') });
    } else {
        res.render('comment', { title: '评论', tag: '' });
    }
});

module.exports = router;
