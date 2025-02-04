// import sum from "./teamA.js";

// console.log(sum(10, 20));

const sum = require("./teamA.js");
console.log(sum(10, 20));

//-------------------------------------------------
// const add = require("./teamA.js");
// const output = add(10, 20);
// console.log(output);

//-------------------------------------------------

// const data = require("./teamA.js");
// console.log(data)
// console.log(data.username);
// console.log(data.add(10, 20));
// console.log(data.mul(10, 20));

//destructuring------------------------------------
// const { username, add, mul } = require("./teamA.js");
// console.log(username);
// console.log(add(10, 20));
// console.log(mul(10, 20));

//-------------------------------------------------

// const arr = [10, 20, 30, 40];
// const temp = (a, b, c, d) => {
//   //element,index,array ,undefined
//   console.log(a, b, c, d)
//   return "Hello"
// }
// const ans = arr.forEach(temp);
// // const ans = arr.map(temp);
// console.log(ans)

//-------------------------------------------------

// const { add } = require("./teamA.js");
// const arr1 = [12, 22, 32, 42];
// let sum = 0;
// const temp1 = (a) => {
//   // sum += a;
//   sum = add(a, sum);
// }
// const calculateArraySum = (input) => {
//   input.forEach(temp1);

// }
// calculateArraySum(arr1);
// console.log(sum)