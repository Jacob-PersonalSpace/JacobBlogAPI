import Express from 'express';
import Config from 'config-lite';
import path from 'path';
import signupRouter from './routes/signup.js';

let app = Express();
let config = Config(__dirname);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
	next();
});

app.use('/signup', signupRouter);

if (module.parent) {
    module.exports = app;
}
else {
    app.listen(config.port, () => {
        console.log(`listening on http://localhost:${config.port}`);
    });
}