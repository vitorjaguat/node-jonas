const fs = require('fs');
const http = require('http');
const url = require('url');

///////////////////////////////////
///FILES

// //Blocking, synchronous way:
// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
// console.log(textIn);
// const textOut = `This is what we know about the avocado: ${textIn}.\nCreated on ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt', textOut);
// console.log('File written');

// //Non-blocking, asynchronous way:
// fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
//   fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
//     console.log(data2);
//     fs.readFile('./txt/append.txt', 'utf-8', (err, data3) => {
//       console.log(data3);
//       fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, 'utf-8', (err) => {
//         console.log('Your file has been written!');
//       });
//     });
//   });
// });
// console.log('Will read file!');

///////////////////////////////////
///SERVER

const server = http.createServer((req, res) => {
  console.log(req.url);

  const pathName = req.url;
  if (pathName === '/' || pathName === '/overview') {
    res.end('This is the OVERVIEW');
  } else if (pathName === '/product') {
    res.end('This is the PRODUCT');
  } else if (pathName === '/api') {
    //__dirname is the same as ./ but ./ will always point to the directory where the script is run from, while __dirname will point to the directory where the script is actually located at.
    fs.readFile(`${__dirname}/dev-data/data.json`, 'utf-8', (err, data) => {
      const productData = JSON.parse(data);
      console.log(productData); //on console and for using the data programmatically, we should parse the JSON string to a JS object
      res.writeHead(200, {
        'Content-Type': 'application/json',
      }); //writing a header to inform the browser that the response is in JSON format (not absolutely necessary in this case)
      res.end(data); //to send the data to be displayed on the browser directly, we should use the original JSON string
    });
  } else {
    res.writeHead(404, {
      'Content-type': 'text/html',
      'my-own-header': 'hello-world',
    });
    res.end('<h1>Page not found!</h1>');
  }
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Listening to requests on port 8000');
});
