const fs = require('fs');
fs.readFile('data.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Error: File not found!');
  }
  console.log('Data=\n', data);
});