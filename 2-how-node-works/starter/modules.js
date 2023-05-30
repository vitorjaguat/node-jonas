//s4l39

console.log(arguments);
console.log(require("module").wrapper); //proving that Node wraps the module inside of a wrapper function

//module.exports
const C = require("./test-module-1");

const calc1 = new C();
console.log(calc1.add(2, 3)); //5

//exports
const calc2 = require("./test-module-2");
console.log(calc2.add(2, 3)); //5

const { add } = require("./test-module-2");
console.log(add(2, 3)); //5

//caching
require("./test-module-3")(); //calling the function directly
require("./test-module-3")(); //calling the function directly
require("./test-module-3")(); //calling the function directly
