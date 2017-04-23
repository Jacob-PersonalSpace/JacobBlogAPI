import Express from 'express';
import { signInArgs, signInAccount, signInPassword, checkNotLogin } from '../src/BLL/check.js';
import { getUserByAccount } from '../src/BLL/Users.js';

let router = Express();

router.get('/', (req, res) => {
    res.render('signin');
});

router.post('/', checkNotLogin, (req, res) => {
    let account = req.body.accountField;
    let password = req.body.passwordField;

    try {
        signInArgs(account, password);
    }
    catch (err) {
        return res.status(500).json({ 'resultType': 'ERROR', 'resultMsg': err.message });
    }

    getUserByAccount(account)
        .then(data => {
            try {
                signInAccount(data);
                signInPassword(password, data.passWord);

                data = data.toObject();
                
                delete data.passWord;

                req.session.user = data;

                return res.status(200).json({ 'resultType': 'SUCCESS', 'resultMsg': data });
            }
            catch (err) {
                return res.status(500).json({ 'resultType': 'ERROR', 'resultMsg': err.message });
            };
        })
        .catch(err => {
            return res.status(500).json({ 'resultType': 'ERROR', 'resultMsg': err.message });
        });
});

export default router;