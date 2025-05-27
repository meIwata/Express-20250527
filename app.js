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

// 用 get 在 /image 路由
// 回傳 public/images/logo.svg 圖片檔案
app.get('/image', (req, res) => {
    // 相對路徑
    res.sendFile(path.join(__dirname, './public/images/logo.svg'));

    //__dirname：代表當前檔案所在的資料夾的絕對路徑
    // res.sendFile(path.join(__dirname, 'public', 'images', 'logo.svg'));

    // 絕對路徑，一般不寫絕對路徑因為換地方的時候連結就會壞掉
    // res.sendFile('/Users/Guest/Downloads/Express/public/images/logo.svg');
});


/* Postman那邊：
    http://localhost:3000/data
    name , anna
*/

// 用 get 在 /data 路由
// 接收query回傳get data
// 資料的屬性name的值

app.get('/data', (req, res) => {
    const name = req.query.name || 'Guest'; // 如果沒有提供name，預設為'Guest'
    res.send(`Get data: ${name}`);
});


app.use(express.json()); // 解析 JSON 請求體

// 用 post 在 /data 路由
// 接收 JSON 資料並回傳 get data
// 資料的屬性 msg 的值
app.post('/data', (req, res) => {
    const msg = req.body.msg || 'No message provided'; // 如果沒有提供msg，預設為'No message provided'
    console.log(msg);
    res.send(`Post data: ${msg}`);
});


// app.post('/data', (req, res) => {
//     const jsonData = req.body; // 取得 POST 請求的 JSON 資料
//     console.log(jsonData);
//     res.send('get data ' + jsonData.text);
// })


app.use(logger('dev'));

app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
