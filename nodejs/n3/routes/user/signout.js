var express = require('express');
var router = express.Router();
var auth = require('../../services/auth');
// mongoose 链接

/* GET users listing. */
router.get('/', function (req, res) {
    //res.clearCookie('user', { path: '/' });
    auth.signOut(req, res, function () {
        res.redirect('/');
    });
});
 

module.exports = router;
