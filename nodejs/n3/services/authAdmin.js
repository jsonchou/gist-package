//check admin login
exports.isAdmin = function (req, res) {
    var ui = req.session.userInfo;
    if (!ui) {
        return false;
    } else {
        var username = ui.user;
        var admin = config.site.admin;
        if (admin.indexOf(username) > -1) {
            return true;
        } else {
            return false;
        }
    }
}

exports.authorize = function (req, res, next) {
    var ui = req.session.userInfo;
    if (!ui) {
        res.redirect('/signin');
    } else {
        var username = ui.user;
        var admin = config.site.admin;
        if (admin.indexOf(username) > -1) {
            next();
        }
    }
}
