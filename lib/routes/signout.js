import Express from 'express';
import { checkLogin } from '../src/BLL/check.js';

let router = Express();

router.get('/', checkLogin, (req, res) => {
    req.session.user = null;

    return res.status(200).json({ 'resultType': 'SUCCESS', 'resultMsg': 'Logout successfully.' });
})

export default router;