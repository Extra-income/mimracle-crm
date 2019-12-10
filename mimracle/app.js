var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var global = require('./my_modules/global');
var template = global.template;


var indexController = require('./routes/indexController');

var app = express();
app.set("template", template);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');

template.config('base', '');
template.config('extname', '.html');
template.config('cache', false);
template.config('compress', true);
template.layout(true, true);
app.engine('html', template.__express);
app.set('view engine', 'html');

// uncomment after placing your favicon in /static
//app.use(favicon(path.join(__dirname, 'static', 'favicon.ico')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/static', express.static(path.join(__dirname, 'static')));
//用express的静态资源管理，路径不变，依旧从/static访问，nginx不再代理转发
app.use(global.interceptor());

//加载路由器
global.loadRoutes(app);


// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

app.use(indexController["404"]);

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    console.log(err);
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

/*process.on('uncaughtException', function (err) {
 //打印出错误
 console.log(err);
 //打印出错误的调用栈方便调试
 console.log(err.stack);
 });*/

module.exports = app;