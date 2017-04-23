import Express from 'express';
import { checkLogin, checkCreateBlogArgs } from '../src/BLL/check.js';
import { saveBlog } from '../src/BLL/Blogs.js';

let router = Express();

router.get('/', checkLogin, (req, res) => {
    res.render('blog');
});

router.post('/', checkLogin, (req, res) => {
    let title = req.body.titleField;
    let content = req.body.contentField;

    try {
        checkCreateBlogArgs(title, content);

        saveBlog(title, content, req.session.user._id, req.session.user.userName, req.session.user.userImage)
        .then(data => {
            return res.status(200).json({ 'resultType': 'SUCCESS', 'resultMsg': data });
        })
        .catch(err => {
            return res.status(500).json({ 'resultType': 'ERROR', 'resultMsg': err.message });
        })
    }
    catch(err) {
        return res.status(500).json({ 'resultType': 'ERROR', 'resultMsg': err.message });
    }
});

export default router;