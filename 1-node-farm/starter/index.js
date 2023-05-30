const fs = require("fs");
const http = require("http");
const url = require("url");

const slugify = require("slugify"); //creates a slug, ie, a string "fresh-avocados" from "fresh avocados"

const replaceTemplate = require("./modules/replaceTemplate");

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

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8"); //__dirname is the same as ./ but ./ will always point to the directory where the script is run from, while __dirname will point to the directory where the script is actually located at.
const dataObj = JSON.parse(data); //parsed data into a JS object, to be used programmatically by JS in our code

const slugs = dataObj.map((el) => slugify(el.productName, { lower: true }));
console.log(slugs);

const tempOverview = fs.readFileSync(
    `${__dirname}/templates/template-overview.html`,
    "utf-8"
);
const tempCard = fs.readFileSync(
    `${__dirname}/templates/template-card.html`,
    "utf-8"
);
const tempProduct = fs.readFileSync(
    `${__dirname}/templates/template-product.html`,
    "utf-8"
);

const server = http.createServer((req, res) => {
    const { query, pathname } = url.parse(req.url, true); //parse the req.url using the parse method that belongs to the url package

    //Overview page
    if (pathname === "/" || pathname === "/overview") {
        res.writeHead(200, {
            "Content-type": "text/html",
        });

        const cardsHtml = dataObj
            .map((el) => replaceTemplate(tempCard, el))
            .join("");
        const output = tempOverview.replace("{%PRODUCT_CARDS%}", cardsHtml);

        res.end(output);

        //Product page
    } else if (pathname === "/product") {
        res.writeHead(200, {
            "Content-type": "text/html",
        });
        const product = dataObj[query.id];
        const output = replaceTemplate(tempProduct, product);

        res.end(output);

        //API
    } else if (pathname === "/api") {
        res.writeHead(200, {
            "Content-Type": "application/json",
        }); //writing a header to inform the browser that the response is in JSON format (not absolutely necessary in this case)
        res.end(data); //to send the data to be displayed on the browser directly, we should use the original JSON string

        //Not found
    } else {
        res.writeHead(404, {
            "Content-type": "text/html",
            "my-own-header": "hello-world",
        });
        res.end("<h1>Page not found!</h1>");
    }
});

server.listen(8000, "127.0.0.1", () => {
    console.log("Listening to requests on port 8000");
});
