module.exports = {
    isAuth: (req, res, next) => {
        if (!req.session.user) {
            res.redirect('/login');
        }
        next();
    }
}
