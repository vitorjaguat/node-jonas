///s4l37

const fs = require("fs");

const server = require("http").createServer();

server.on("request", (req, res) => {
    //solution 1: no streams
    //     fs.readFile("test-file.txt", (err, data) => {
    //         if (err) console.error(err);
    //         res.end(data);
    //     });
    // });

    //solution 2: streams
    //     const readable = fs.createReadStream("test-file.txt");
    //     readable.on("data", (chunk) => {
    //         res.write(chunk);
    //     });
    //     readable.on("end", () => {
    //         res.end();
    //     });
    //     readable.on("error", (err) => {
    //         console.error(err);
    //         res.statusCode = 500;
    //         res.end("File not found");
    //     });

    //solution 3: streams and pipes
    const readable = fs.createReadStream("test-file.txt");
    readable.pipe(res);
});

server.listen(8000, "127.0.0.1", () => {
    console.log("Listening...");
});
