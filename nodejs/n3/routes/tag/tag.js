var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res) {
    var q = req.param('q');
    if (q) {
        res.render('tag', { title: '标签' + q + '的结果页', tag: req.param('q') });
    } else {
        res.render('tag', { title: '标签', tag: '' });
    }
});

module.exports = router;
