import { userModel } from '../dbSchema/Users.js';

const saveUser = (firstName, lastName, userName, email, passWord, gender, userImage) => {
    let data = new userModel({
        firstName: firstName,
        lastName: lastName,
        userName: userName,
        email: email,
        passWord: passWord,
        gender: gender,
        userImage: userImage,
        createAt: new Date().toLocaleString()
    });
    
    return data.save();
};

const getUserByAccount = (account) => {
    return userModel.findOne({ $or: [{ userName: account }, { email: account }] });
};

const getUserByUserNameEmail = (userName, email) => {
    return userModel.findOne({ $or: [{ userName: { $in: [userName, email] } }, { email: { $in: [userName, email] } }] });
};

export { saveUser, getUserByAccount, getUserByUserNameEmail };