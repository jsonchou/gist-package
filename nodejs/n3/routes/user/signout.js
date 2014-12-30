var express = require('express');
var router = express.Router();

// mongoose 链接

/* GET users listing. */
router.get('/', function (req, res) {
    res.clearCookie('user', { path: '/' });
    res.redirect('/');
});
 

module.exports = router;
