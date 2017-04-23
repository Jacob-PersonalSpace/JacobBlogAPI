import Express from 'express';
import Busboy from 'busboy';
import fs from 'fs';
import path from 'path';
import bcrypt from 'bcrypt';
import { signUpArgs, checkIfUserExist } from '../src/BLL/check.js';
import { writeFileAsync } from '../src/BLL/writeFile.js';
import { saveUser, getUserByUserNameEmail } from '../src/BLL/Users.js';

let router = Express();

router.get('/', (req, res) => {
    res.render('signup');
})

router.post('/', (req, res) => {
    let busboy = new Busboy({ headers: req.headers });
    let imageData, saveTo, imageType, imageNewFileName;
    let chunks = [];
    let firstNameField, lastNameField, userNameField, emailField, passwordField, rePasswordField, genderField;

    busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
        imageType = mimetype.split('/')[1];

        file.on('data', (chunk) => {
            chunks.push(chunk);
        });

        file.on('end', () => {
            imageData = Buffer.concat(chunks);
        });
    });

    busboy.on('field', (fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) => {
        switch (fieldname) {
            case 'firstNameField':
                firstNameField = val;
                break;
            case 'lastNameField':
                lastNameField = val;
                break;
            case 'userNameField':
                userNameField = val;
                imageNewFileName = userNameField + '.' + imageType;
                saveTo = path.join('./public/images', path.basename(imageNewFileName));
                break;
            case 'emailField':
                emailField = val;
                break;
            case 'passwordField':
                passwordField = val;
                break;
            case 'rePasswordField':
                rePasswordField = val;
                break;
            case 'genderField':
                genderField = val;
                break;
            default:
                break;
        }
    });

    busboy.on('partsLimit', () => { });

    busboy.on('filesLimit', () => { });

    busboy.on('fieldsLimit', () => { });

    busboy.on('finish', () => {
        try {
            signUpArgs(firstNameField, lastNameField, userNameField, emailField, passwordField, rePasswordField, genderField);
        }
        catch (err) {
            return res.status(412).json({ 'resultType': 'ERROR', 'resultMsg': err.message });
        }

        getUserByUserNameEmail(userNameField, emailField)
            .then(data => {
                checkIfUserExist(data);

                if (chunks.length === 0) {
                    imageNewFileName = 'defaultimageslengthmorethan20.png';
                }

                return writeFileAsync(saveTo, imageData);
            })
            .then(() => {
                let saltRounds = 10;
                let salt = bcrypt.genSaltSync(saltRounds);
                let hashPassword = bcrypt.hashSync(passwordField, salt);

                return saveUser(firstNameField, lastNameField, userNameField, emailField, hashPassword, genderField, imageNewFileName);
            })
            .then((data) => {
                return res.status(200).json({ 'userName': data.userName });
            })
            .catch((err) => {
                return res.status(500).json({ 'resultType': 'ERROR', 'resultMsg': err.message });
            });
    });

    busboy.on('error', (err) => {
        return res.status(500).json({ 'resultType': 'ERROR', 'resultMsg': err.message });
    });

    req.pipe(busboy);
});

export default router;