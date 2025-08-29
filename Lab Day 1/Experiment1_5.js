const fs = require('fs');
const writeStream = fs.createWriteStream('output.txt');
writeStream.write('Hello, Node.js!');
writeStream.end();
writeStream.on('finish', () => {
console.log('Data has been written to output.txt successfully.');
});
