import { blogModel } from '../dbSchema/Blogs.js';
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

export { saveBlog, likeBlog };