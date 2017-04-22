import Express from 'express';
import Config from 'config-lite';
import signupRouter from './routes/signup.js';

let app = Express();
let config = Config(__dirname);

app.use('/', signupRouter);

if (module.parent) {
    module.exports = app;
}
else {
    app.listen(config.port, () => {
        console.log(`listening on http://localhost:${config.port}`);
    });
}