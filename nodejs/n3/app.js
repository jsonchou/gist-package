var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');
var ejs = require('ejs');

var index = require('./routes/index');
var hi = require('./routes/hi');
var about = require('./routes/about');

//search
var search = require('./routes/search/search');
//tag
var tag = require('./routes/tag/tag');
//topic
var topic = require('./routes/topic/topic');
//comment
var comment = require('./routes/comment/comment');
//user
var signin = require('./routes/user/signin');
var signup = require('./routes/user/signup');
var userinfo = require('./routes/user/userinfo');
var signout = require('./routes/user/signout');
var getpwd = require('./routes/user/getpwd');

var app = express();

// view engine setup
app.engine('.html', ejs.__express);
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/hi', hi);
app.use('/about', about);

//user
app.use('/signup', signup);
app.use('/signin', signin);
app.use('/userinfo', userinfo);
app.use('/signout', signout);
app.use('/getpwd', getpwd);
//search
app.use('/search', search);
//tag
app.use('/tag', tag);
//topic
app.use('/topic', topic);
//comment
app.use('/comment', comment);

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
