var jc = require('../services/util');

// check login
exports.isLogin = function (req, res) {
    if (req.cookies.user) {
        return true;
    }
    return false;
}

// login filter
exports.authorize = function (req, res, next) {
    //jc.log(req.cookies.user);
    if (!req.cookies.user) {
        res.redirect('/signin');
    } else {
        next();
    }
}
