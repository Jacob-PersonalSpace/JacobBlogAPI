import Express from 'express';
import { checkLogin, checkCreateBlogArgs, checkPushCommentArgs } from '../src/BLL/check.js';
import { getAllBlogs, getPersonalBlogs, getBlogsFilterByTitle, saveBlog, deleteBlog, likeBlog, unLikeBlog, commentBlog, deleteCommentBlog } from '../src/BLL/Blogs.js';

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
            });
    }
    catch (err) {
        return res.status(500).json({ 'resultType': 'ERROR', 'resultMsg': err.message });
    }
});

router.post('/delete', checkLogin, (req, res) => {
    let blogId = req.body.blogIdField;

    deleteBlog(blogId, req.session.user._id)
        .then(data => {
            return res.status(200).json({ 'resultType': 'SUCCESS', 'resultMsg': data });
        })
        .catch(err => {
            return res.status(500).json({ 'resultType': 'ERROR', 'resultMsg': err.message });
        });
});

router.get('/likes', checkLogin, (req, res) => {
    res.render('likes');
});

router.post('/likes', checkLogin, (req, res) => {
    let blogId = req.body.blogIdField;

    likeBlog(blogId, req.session.user._id)
        .then(data => {
            return res.status(200).json({ 'resultType': 'SUCCESS', 'resultMsg': data });
        })
        .catch(err => {
            return res.status(500).json({ 'resultType': 'ERROR', 'resultMsg': err.message });
        });
});

router.post('/likes/delete', checkLogin, (req, res) => {
    let blogId = req.body.blogIdField;

    unLikeBlog(blogId, req.session.user._id)
        .then(data => {
            return res.status(200).json({ 'resultType': 'SUCCESS', 'resultMsg': data });
        })
        .catch(err => {
            return res.status(500).json({ 'resultType': 'ERROR', 'resultMsg': err.message });
        });
});

router.get('/comments', checkLogin, (req, res) => {
    res.render('comments');
});

router.post('/comments', checkLogin, (req, res) => {
    let blogId = req.body.blogIdField;
    let message = req.body.messageField;
    let userId = req.session.user._id;
    let userImage = req.session.user.userImage;
    let userName = req.session.user.userName;
    let replyUserName = req.body.replyUserNameField;
    let replyUserId = req.body.replyUserIdField;
    let replyUserImage = req.body.replyUserImageField;

    try {
        checkPushCommentArgs(blogId, message);
    }
    catch (err) {
        return res.status(500).json({ 'resultType': 'ERROR', 'resultMsg': err.message });
    }

    commentBlog(blogId, userId, userImage, userName, message, replyUserName, replyUserId, replyUserImage)
        .then(data => {
            return res.status(200).json({ 'resultType': 'SUCCESS', 'resultMsg': data });
        })
        .catch(err => {
            return res.status(500).json({ 'resultType': 'ERROR', 'resultMsg': err.message });
        });
});

router.post('/comments/delete', checkLogin, (req, res) => {
    let blogId = req.body.blogIdField;
    let commentId = req.body.commentIdField;

    deleteCommentBlog(blogId, commentId, req.session.user._id)
        .then(data => {
            return res.status(200).json({ 'resultType': 'SUCCESS', 'resultMsg': data });
        })
        .catch(err => {
            return res.status(500).json({ 'resultType': 'ERROR', 'resultMsg': err.message });
        });
});

router.get('/filter', (req, res) => {
    res.render('filter');
});

router.post('/filter', (req, res) => {
    let title = req.body.titleField;

    getBlogsFilterByTitle(title)
        .then(data => {
            for (let i = 0; i < data.length; i++) {
                data[i].content = data[i].content.substr(0, 50);
            }

            return res.status(200).json({ 'resultType': 'SUCCESS', 'resultMsg': data });
        })
        .catch(err => {
            return res.status(500).json({ 'resultType': 'ERROR', 'resultMsg': err.message });
        });
});

router.get('/blogs', (req, res) => {
    getAllBlogs()
        .then(data => {
            for (let i = 0; i < data.length; i++) {
                data[i].content = data[i].content.substr(0, 50);
            }

            return res.status(200).json({ 'resultType': 'SUCCESS', 'resultMsg': data });
        })
        .catch(err => {
            return res.status(500).json({ 'resultType': 'ERROR', 'resultMsg': err.message });
        });
});

router.get('/blogs/personal', checkLogin, (req, res) => {
    getPersonalBlogs(req.session.user._id)
        .then(data => {
            for (let i = 0; i < data.length; i++) {
                data[i].content = data[i].content.substr(0, 50);
            }

            return res.status(200).json({ 'resultType': 'SUCCESS', 'resultMsg': data });
        })
        .catch(err => {
            return res.status(500).json({ 'resultType': 'ERROR', 'resultMsg': err.message });
        });
});

export default router;