import { blogModel, commentModel } from '../dbSchema/Blogs.js';

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

const deleteBlog = (blogId, userId) => {
    return blogModel.findOneAndRemove(
        {
            _id: blogId,
            userId: userId
        },
        {
            select: {
                _id: 1
            }
        }
    );
};

const likeBlog = (blogId, userId) => {
    return blogModel.findOneAndUpdate(
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
        }
    );
};

const unLikeBlog = (blogId, userId) => {
    return blogModel.findOneAndUpdate(
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
        }
    );
};

const commentBlog = (blogId, userId, userImage, userName, message, replyUserName, replyUserId, replyUserImage) => {
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

    return blogModel.findByIdAndUpdate(
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
        }
    );
};

const deleteCommentBlog = (blogId, commentId, userId) => {
    return blogModel.findOneAndUpdate(
        {
            _id: blogId,
            comments: {
                $elemMatch: {
                    _id: commentId,
                    userId: userId
                }
            }
        },
        {
            $pull: {
                comments: {
                    _id: commentId
                }
            },
            $inc: {
                commentsNo: -1
            }
        },
        {
            new: true,
            upsert: true,
            runValidators: true,
            select: {
                comments: 1,
                commentsNo: 1
            }
        }
    );
};

const getAllBlogs = () => {
    return blogModel.find(
        {},
        {
            _id: 1,
            userName: 1,
            userId: 1,
            userImage: 1,
            title: 1,
            content: 1,
            likesNo: 1,
            commentsNo: 1,
            createAt: 1
        }
    );
};

const getPersonalBlogs = (userId) => {
    return blogModel.find(
        {
            userId: userId
        },
        {
            _id: 1,
            userName: 1,
            userId: 1,
            userImage: 1,
            title: 1,
            content: 1,
            likesNo: 1,
            commentsNo: 1,
            createAt: 1
        }
    );
};

const getBlogsFilterByTitle = (title) => {
    return blogModel.find(
        {
            title: eval("/" + title + "/i")
        },
        {
            _id: 1,
            userName: 1,
            userId: 1,
            userImage: 1,
            title: 1,
            content: 1,
            likesNo: 1,
            commentsNo: 1,
            createAt: 1
        }
    );
};

export { getAllBlogs, getPersonalBlogs, getBlogsFilterByTitle, saveBlog, deleteBlog, likeBlog, unLikeBlog, commentBlog, deleteCommentBlog };