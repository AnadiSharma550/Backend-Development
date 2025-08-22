const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
  fs.readFile('data.txt', 'utf8', (err, data) => {
    if (err) {
      res.end('Error reading file');
      return;
    }
    res.end(data);
  });
}).listen(3000);

console.log('Server running at http://localhost:3000');
