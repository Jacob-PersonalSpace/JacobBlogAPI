import mongoose from './db.js';

let Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: { type: String },
    lastName: { type: String },
    userName: { type: String },
    email: { type: String },
    passWord: { type: String },
    gender: { type: String },
    userImage: { type: String },
    createAt: { type: String }
});

const userModel = mongoose.model('users', userSchema);

export { userModel };