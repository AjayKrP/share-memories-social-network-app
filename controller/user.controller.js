const bcrypt = require('bcrypt');
const user = require('../models/index').user;

module.exports = {
    login: (req, res) => {
        res.render('auth/login', {title: 'Share Memories Login Page'})
    },
    register: (req, res) => {
        res.render('auth/signup', {title: 'Share Memories Register Page'})
    },
    loginPost: async (req, res) => {
        let body = req.body;
        if (!Object.hasOwnProperty.bind(body)('email') ||
            !Object.hasOwnProperty.bind(body)('password')) {
            res.render('error', {message: 'Some required fields are missing'});
        }

        let _user = await user.findOne({email: body.email});
        if (!_user) {
            res.render('error', {message: 'User does not exists!'});
        }
        if (await bcrypt.compare(req.body.password, _user.password)) {
            req.session.user = _user;
            res.redirect('/users/account');
        }
        res.redirect('/users/login');
    },

    registerPost: async (req, res) => {
        let body = req.body;

        if (!Object.hasOwnProperty.bind(body)('email') ||
            !Object.hasOwnProperty.bind(body)('password') ||
            !Object.hasOwnProperty.bind(body)('name')
        ) {
            res.render('error', {message: 'Some required fields are missing'});
        }

        try {
            let _user = await user.findOne({email: body.email});
            if (_user) {
                res.render('error', {message: 'User already exists'});
            }

            const hashPassword = await bcrypt.hash(req.body.password, 10);
            const newUser = await user.create({email: body.email, password: hashPassword, name: body.name});
            if (newUser) {
                res.redirect('/users/login');
            }
        } catch (e) {
            res.render('error', {message: e.toString()});
        }
    },

    account: function (req, res) {
        res.render('user/account', {title: 'User Account'});
    }
}