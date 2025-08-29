const fs = require('fs');
const readStream = fs.createReadStream('data.txt', 'utf8');
readStream.on('data', (chunk) => {
  console.log(chunk);
});

readStream.on('end', () => {
  console.log('Read the File.');
});

readStream.on('error', (err) => {
  console.error('Error:', err.message);
});
