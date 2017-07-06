// 加载依赖库，原来这个类库都封装在connect中，现在需地注单独加载
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// 加载路由控制
var student = require('./routes/student');
var teacher = require('./routes/teacher');

// 创建项目实例
var app = express();
//设置跨域访问
var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:63342');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  // res.header('Access-Control-Allow-Headers', 'Content-Type');
  // res.header('Access-Control-Allow-Credentials','true');
  next();
};
app.use(allowCrossDomain);

// app.listen(4444);

// 引入handlebars
var handlebars = require('express3-handlebars')
  .create({
    defaultLayout: 'main', // 设置默认布局为main 
    extname: '.hbs', // 设置模板引擎文件后缀为.hbs 
  });

// 定义jade模板引擎和模板文件位置，也可以使用jade或其他模型引擎
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars.engine); // 将express模板引擎配置成handlebars 
app.set('view engine', 'handlebars');

// 定义icon图标
// app.use(favicon(__dirname + '/public/favicon.ico'));
// 定义日志和输出级别
app.use(logger('dev'));
// 定义数据解析器
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
// 定义cookie解析器
app.use(cookieParser());
// 定义静态文件目录
app.use(express.static(path.join(__dirname, 'public')));

// 匹配路径和路由
app.use('/yuhu/student', student);
app.use('/yuhu/teacher', teacher);

// 404错误处理
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// 生产环境，500错误处理
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

// 输出模型app
module.exports = app;

