import mongoose from './db.js';

let Schema = mongoose.Schema;

const commentSchema = new Schema({
    userName: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, required: true },
    userImage: { type: String, required: true },
    replyUserName: { type: String },
    replyUserId: { type: Schema.Types.ObjectId },
    replyUserImage: { type: String },
    message: { type: String, required: true },
    createAt: { type: Date, default: Date.now, required: true }
});

const blogSchema = new Schema({
    userName: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, required: true },
    userImage: { type: String, required: true },
    createAt: { type: Date, default: Date.now, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    likesNo: { type: Number, default: 0, required: true },
    likes: [ Schema.Types.ObjectId ],
    commentsNo: { type: Number, default: 0, required: true },
    comments: [ commentSchema ]
});

const blogModel = mongoose.model('blogs', blogSchema);
const commentModel = mongoose.model('comments', commentSchema);

export { Schema, commentModel, blogModel };