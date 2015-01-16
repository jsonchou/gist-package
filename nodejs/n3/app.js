var express = require('express');
var session = require('express-session');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var multer = require('multer');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');
var ejs = require('ejs');

jc = require('./services/util');
config = require('./config');

//index
var index = require('./routes/index');

var hi = require('./routes/hi');
var about = require('./routes/about');

//search
var search = require('./routes/search/search');
//topic
var topic_show = require('./routes/topic/show');
var topic_post = require('./routes/topic/post');
//comment
var comment_post = require('./routes/comment/post');
//user
var user_show = require('./routes/user/show');
var user_rank = require('./routes/user/rank');
var signin = require('./routes/user/signin');
var signup = require('./routes/user/signup');
var userinfo = require('./routes/user/userinfo');
var signout = require('./routes/user/signout');
var getpwd = require('./routes/user/getpwd');

//api restfull
var api_topics = require('./routes/api/topics');

var app = express();

app.use(session({
    secret: config.site.cookieSecret,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 3600000 * 24 }//一天
}))

//格式化时间

// view engine setup
app.engine('.html', ejs.__express);
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

// uncomment after placing your favicon in /public

app.use('/public', express.static(__dirname + '/public'));

app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use(multer({
    dest: './public/files/avator',
    rename: function (fieldname, filename) {
        return Date.now() + Math.floor(Math.random() * 0x10000);
    }
}));

app.use(function (req, res, next) {
    res.locals.gUserInfo = req.session.userInfo;
    next();
});

app.use('/', index);
app.use('/hi', hi);
app.use('/about', about);
//user
app.use('/signup', signup);
app.use('/signin', signin);
app.use('/signout', signout);
app.use('/getpwd', getpwd);
app.use('/user/userinfo', userinfo);
app.use('/user/rank', user_rank);
app.use('/user/', user_show);

//search
app.use('/search', search);
//topic
app.use('/topic/post', topic_post);
app.use('/topic', topic_show);
//comment
app.use('/comment/post', comment_post);

//restfull api
app.use('/api/topics', api_topics);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;

// 启动及端口
http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
