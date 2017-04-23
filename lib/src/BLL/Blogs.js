import { blogModel } from '../dbSchema/Blogs.js';

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

export { saveBlog };