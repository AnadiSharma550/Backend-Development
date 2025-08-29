const fs = require("fs");
const readableStream = fs.createReadStream("input.txt");
const writableStream = fs.createWriteStream("output.txt");
readableStream.pipe(writableStream);
console.log("Data is being piped from input.txt to output.txt...");
