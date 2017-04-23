import Express from 'express';
import Config from 'config-lite';
import path from 'path';
import bodyParser from 'body-parser';
import session from 'express-session';

import signupRouter from './routes/signup.js';
import signinRouter from './routes/signin.js';
import signoutRouter from './routes/signout.js';
import blogRouter from './routes/blog.js';

let app = Express();
let config = Config(__dirname);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(Express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    name: config.session.key,// 设置 cookie 中保存 session id 的字段名称
    secret: config.session.secret,// 通过设置 secret 来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改
    resave: true,// 强制更新 session
    saveUninitialized: true,// 设置为 false，强制创建一个 session，即使用户未登录
    cookie: {
        maxAge: config.session.maxAge// 过期时间，过期后 cookie 中的 session id 自动删除
    }
}));

app.use('*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    next();
});

app.use('/static', Express.static(path.join(__dirname, 'public')));
app.use('/signin', signinRouter);
app.use('/signup', signupRouter);
app.use('/signout', signoutRouter);
app.use('/blog', blogRouter);

if (module.parent) {
    module.exports = app;
}
else {
    app.listen(config.port, () => {
        console.log(`listening on http://localhost:${config.port}`);
    });
}