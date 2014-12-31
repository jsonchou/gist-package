var jc = require('../services/util');

exports.authorize = function (req, res, next) {
    //jc.log(req.cookies.user);
    if (!req.cookies.user) {
        res.redirect('/signin');
    } else {
        next();
    }
}
