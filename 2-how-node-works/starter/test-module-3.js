console.log("Hello from the module"); //will print once

module.exports = () => console.log("Log this text from module 3"); //will print 3 times because module was called 3 times
