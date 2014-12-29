var express = require('express');
var router = express.Router();

// mongoose 链接

/* GET users listing. */
router.get('/', function (req, res) {
    res.clearCookie('user', { path: '/' });
    var json = {
        topics: [],
        title: "Node js index"
    }
    res.render('index', json);
});
 

module.exports = router;
