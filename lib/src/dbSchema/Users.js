import mongoose from './db.js';

let Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    userName: { type: String, required: true },
    email: { type: String, required: true },
    passWord: { type: String, required: true },
    gender: { type: String, required: true },
    userImage: { type: String },
    createAt: { type: String, default: Date.now, required: true }
});

const userModel = mongoose.model('users', userSchema);

export { userModel };