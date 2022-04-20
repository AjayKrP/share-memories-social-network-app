const bcrypt = require('bcrypt');
const {user} = require('../models/index');

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
            req.flash('error', 'Some required fields are missing!');
            res.redirect('/user/login');
        }
        console.log(body);

        let _user = await user.findOne({
            where: {email: body.email}
        });
        if (!_user) {
            req.flash('error', 'User not found!');
            res.redirect('/users/register');
        }
        if (await bcrypt.compare(req.body.password, _user.password)) {
            req.session.user = _user;
            // res.locals.user = _user;
            req.flash('success', 'Login successful!');
            res.redirect('/users/account');
        }
        req.flash('error', 'Error while login!');
        res.redirect('/users/login');
    },

    registerPost: async (req, res) => {
        let body = req.body;

        if (!Object.hasOwnProperty.bind(body)('email') ||
            !Object.hasOwnProperty.bind(body)('password') ||
            !Object.hasOwnProperty.bind(body)('name')
        ) {
            req.flash('error', 'Some required fields are missing!');
            res.redirect('/users/register');
        }

        try {
            let _user = await user.findOne({
                where: {email: body.email}
            });

            if (_user) {
                req.flash('error', 'User already exists');
                res.redirect('/users/login');
            }

            const hashPassword = await bcrypt.hash(req.body.password, 10);
            const newUser = await user.create({email: body.email, password: hashPassword, name: body.name});
            if (newUser) {
                req.flash('success', 'Registration done! Please login to continue.');
                res.redirect('/users/login');
            }
        } catch (e) {
            req.flash('error', 'Something went wrong while creating account!');
            res.redirect('/users/register');
        }
    },

    account: async (req, res) => {
        const _user = await user.findOne({id: req.session.user.id});
        res.render('user/account', {title: 'User Account', user: _user});
    },

    logout: (req, res) => {
        req.flash('success', 'Logout successful!');
        req.session.destroy();
        res.redirect('/');
    }
}
