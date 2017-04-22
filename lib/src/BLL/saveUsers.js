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

export { saveUser };