import { blogModel, commentModel } from '../dbSchema/Blogs.js';
import Promise from 'bluebird';

const saveBlog = (title, content, userId, userName, userImage) => {
    let data = new blogModel({
        userName: userName,
        userId: userId,
        userImage: userImage,
        createAt: new Date().toLocaleString(),
        title: title,
        content: content
    });

    return data.save();
};

const deleteBlog = (blogId, userId) => new Promise((resolve, reject) => {
    blogModel.findOneAndRemove(
        {
            _id: blogId,
            userId: userId
        },
        {
            select: {
                _id: 1
            }
        },
        (err, res) => {
            if (err) {
                reject(err);
            }

            resolve(res);
        }
    );
});

const likeBlog = (blogId, userId) => new Promise((resolve, reject) => {
    blogModel.findOneAndUpdate(
        {
            _id: blogId,
            likes: {
                $ne: userId
            }
        },
        {
            $push: {
                likes: userId
            },
            $inc: {
                likesNo: 1
            }
        },
        {
            new: true,
            upsert: true,
            runValidators: true,
            select: {
                likesNo: 1
            }
        },
        (err, res) => {
            if (err) {
                reject(err);
            }

            resolve(res);
        }
    );
});

const unLikeBlog = (blogId, userId) => new Promise((resolve, reject) => {
    blogModel.findOneAndUpdate(
        {
            _id: blogId,
            likes: userId
        },
        {
            $pull: {
                likes: userId
            },
            $inc: {
                likesNo: -1
            }
        },
        {
            new: true,
            upsert: true,
            runValidators: true,
            select: {
                likesNo: 1
            }
        },
        (err, res) => {
            if (err) {
                reject(err);
            }

            resolve(res);
        }
    );
});

const commentBlog = (blogId, userId, userImage, userName, message, replyUserName, replyUserId, replyUserImage) => new Promise((resolve, reject) => {
    let commentObject = replyUserId ?
        new commentModel({
            userName: userName,
            userId: userId,
            userImage: userImage,
            replyUserName: replyUserName,
            replyUserId: replyUserId,
            replyUserImage: replyUserImage,
            message: message,
            createAt: new Date().toLocaleString()
        }) :
        new commentModel({
            userName: userName,
            userId: userId,
            userImage: userImage,
            message: message,
            createAt: new Date().toLocaleString()
        });

    blogModel.findByIdAndUpdate(
        blogId,
        {
            $push: {
                comments: commentObject
            },
            $inc: {
                commentsNo: 1
            }
        },
        {
            new: true,
            upsert: true,
            runValidators: true,
            select: {
                commentsNo: 1,
                comments: 1
            }
        },
        (err, res) => {
            if (err) {
                reject(err);
            }

            resolve(res);
        }
    );
});

export { saveBlog, deleteBlog, likeBlog, unLikeBlog, commentBlog };