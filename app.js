var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();


// 基本路由
// 用 get 在 /hello 路由
// 返回 "Hello World!" 字符串
app.get('/hello', (req, res) => {
    res.send('Hello World!');
});

// 用get 在 /json 路由
// 返回一個 JSON 範例物件 要多3筆屬性跟值
app.get('/json', (req, res) => {
    res.json({
        message: 'Hello, JSON!',
        status: 'success',
        data: {
            id: 1,
            name: 'Sample Item',
            type: 'Demo'
        }
    });
});



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
