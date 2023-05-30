//s4l35

const EventEmitter = require("events");
const http = require("http");

class Sales extends EventEmitter {
    constructor() {
        super();
    }
}

const myEmitter = new Sales();

myEmitter.on("newSale", () => {
    console.log("There was a new sale");
});

myEmitter.on("newSale", () => {
    console.log("Costumer name: Jaguat");
});

myEmitter.on("newSale", (stock) => {
    console.log(`There are now ${9} items left in stock`);
});

myEmitter.emit("newSale", 9);

//////////////////////
const server = http.createServer();

server.on("request", (req, res) => {
    console.log("Received request");
    console.log(req.url);
});

server.on("request", (req, res) => {
    res.end("Another request completed");
});

server.on("close", () => {
    console.log("Server closed");
});

server.listen(8000, "127.0.0.1", () => {
    console.log("Waiting for requests......");
});
