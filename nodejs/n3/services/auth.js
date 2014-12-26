exports.authorize = function (req, res, next) {
    if (!req.session.user_id) {
        res.redirect('/admin/login');
    } else {
        next();
    }
}
