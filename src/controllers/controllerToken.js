import fs from 'fs';

const readFile = (callback) => {
    fs.readFile('./src/database/token.json','utf-8', (err, data) => {
        if (err) {
            console.log(err);
            return;
        }
        callback(data);
    });
}

const writeFile = (data) => {
    fs.writeFileSync('./src/database/token.json',data)
}
      

export {readFile, writeFile}
