import Promise from 'bluebird';
import fs from 'fs';

const writeFileAsync = (path, data) => new Promise((resolve, reject) => {
    try {
        fs.writeFile(path, data);
        resolve();
    }
    catch(error) {
        reject(error);
    }
});

export { writeFileAsync };