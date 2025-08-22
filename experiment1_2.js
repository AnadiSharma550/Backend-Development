const fs = require('fs');
fs.readFile('data.txt', 'utf8', (err, data) => {
  if (err) {
    if (err.code === 'ENOENT') {
      console.error('Error: File not found!');
    } else {
      console.error('An error occurred:', err);
    }
    return;
  }
  console.log('Data=\n', data);
});
