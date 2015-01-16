// check login
exports.isLogin = function (req, res) {
    if (req.session.userInfo) {
        return true;
    }
    return false;
}

//sing out
exports.signOut = function (req, res, next) {
    if (this.isLogin(req, res)) {
        req.session.userInfo = null;
        delete req.session.userInfo;
    }
    next();
}

// login filter
exports.authorize = function (req, res, next) {
    //jc.log(req.cookies.user);
    if (!this.isLogin(req,res)) {
        res.redirect('/signin');
    } else {
        next();
    }
}
