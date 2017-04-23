import mongoose from './db.js';

let Schema = mongoose.Schema;

const commentSchema = new Schema({
    userName: { type: String },
    userId: { type: Schema.Types.ObjectId },
    userImage: { type: String },
    replyUserName: { type: String },
    replyUserId: { type: Schema.Types.ObjectId },
    replyUserImage: { type: String },
    message: { type: String },
    createAt: { type: Date }
});

const blogSchema = new Schema({
    userName: { type: String },
    userId: { type: Schema.Types.ObjectId },
    userImage: { type: String },
    createAt: { type: Date },
    title: { type: String },
    content: { type: String },
    likes: { type: [String] },
    comments: { type: [commentSchema] }
});

const blogModel = mongoose.model('blogs', blogSchema);

export { blogModel };