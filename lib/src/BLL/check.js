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

export { signUpArgs };