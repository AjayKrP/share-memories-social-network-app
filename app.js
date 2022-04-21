const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const hbs = require('hbs');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const db = require('./models').sequelize;
const app = express();
const oneDay = 1000 * 60 * 60 * 24;
const flash = require('connect-flash');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const memoriesRouter = require('./routes/memories');

/*db.query('SET FOREIGN_KEY_CHECKS = 0')
    .then(function(){
        return db.sync({ force: true });
    })
    .then(function(){
        return db.query('SET FOREIGN_KEY_CHECKS = 1')
    })
    .then(function(){
        console.log('Database synchronised.');
    }, function(err){
        console.log(err);
    });*/

hbs.registerPartials(__dirname + '/views/partials');

/**
 * For debug purpose
 */
hbs.registerHelper('json', function(context) {
    return JSON.stringify(context);
});

const sessionStore = new SequelizeStore({
    db: db,
    checkExpirationInterval: 15 * 60 * 1000,
    expiration: 7 * 24 * 60 * 60 * 1000
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));


app.use(session({
    secret: 'This is my secret',
    resave: false,
    store: sessionStore,
    cookie: {maxAge: oneDay},
    saveUninitialized: false
}));

app.use(cookieParser());
app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));

// server loggedIn user session to frontend
app.use((req, res, next) => {
    res.locals.app_message = req.flash();
    if (req.session.user) {
        res.locals.user = req.session.user;
    }
    next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/memories', memoriesRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
