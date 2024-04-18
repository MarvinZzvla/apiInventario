import fs from 'fs';

const readFile = fs.readFileSync('./src/database/token.json', 'utf8')
const writeFile = (data) => {
fs.writeFileSync('./src/database/token.json', JSON.stringify(data))
}

export {readFile, writeFile}
