import bcrypt from 'bcrypt';

const checkIfUserExist = (data) => {
    if (data) {
        throw new Error('UserName or Email is exsit.');
    }
};

const signUpArgs = (firstNameField, lastNameField, userNameField, emailField, passwordField, rePasswordField, genderField) => {
    if (firstNameField === undefined || firstNameField === null || firstNameField === '') {
        throw new Error('First name is required.');
    }
    if (lastNameField === undefined || lastNameField === null || lastNameField === '') {
        throw new Error('Last name is required.');
    }
    if (userNameField === undefined || userNameField === null || userNameField === '') {
        throw new Error('User name is required.');
    }
    if (userNameField.length < 1 || userNameField.length > 20) {
        throw new Error("The length of user name should be between 1 to 20.");
    }
    if (emailField === undefined || emailField === null || emailField === '') {
        throw new Error('Email is required.');
    }
    if (passwordField === undefined || passwordField === null || passwordField === '') {
        throw new Error('Password is required.');
    }
    if (rePasswordField === undefined || rePasswordField === null || rePasswordField === '') {
        throw new Error('Repassword is required.');
    }
    if (passwordField !== rePasswordField) {
        throw new Error('Repassword should be the same with password.');
    }
    if (genderField === undefined || genderField === null || genderField === '') {
        throw new Error('Gender is required.');
    }
};

const signInArgs = (account, password) => {
    if (account === undefined || account === null || account === '') {
        throw new Error('Account is required.');
    }
    if (password === undefined || password === null || password === '') {
        throw new Error('Password is required.');
    }
};

const signInAccount = (data) => {
    if (!data) {
        throw new Error('User is not exist.');
    }
};

const signInPassword = (actualPW, expectPW) => {
    if (!bcrypt.compareSync(actualPW, expectPW)) {
        throw new Error('Password is incorrect.');
    }
};

const checkLogin = (req, res, next) => {
    if (!req.session.user) {
        return res.status(401).json({ 'resultType': 'ERROR', 'resultMsg': 'User is required.' });
    }
    next();
};

const checkNotLogin = (req, res, next) => {
    if (req.session.user) {
        return res.status(202).json({ 'resultType': 'SUCCESS', 'resultMsg': `User ${req.session.user.userName} has login.` });
    }
    next();
};

export { checkIfUserExist, signUpArgs, signInArgs, signInAccount, signInPassword, checkLogin, checkNotLogin };