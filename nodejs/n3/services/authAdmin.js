//check admin login
exports.isAdmin = function (req,res) {
    if (!req.cookies.user) {
        return false;
    } else {
        var user = req.cookies.user;
        var username = user.split('|')[1];
        var admin = config.site.admin;
        if (admin.indexOf(username) > -1) {
            return true;
        } else {
            return false;
        }
    }
}

exports.authorize = function (req, res, next) {
    //jc.log(req.cookies.user);
    if (!req.cookies.user) {
        res.redirect('/signin');
    } else {
        var user = req.cookies.user;
        var username = user.split('|')[1];
        var admin = config.site.admin;
        if (admin.indexOf(username) > -1) {
            next();
        }
    }
}
