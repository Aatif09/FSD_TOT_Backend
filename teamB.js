// import sum from teamA;
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

const arr = [10, 20, 30, 40];
const temp = (a, b, c, d) => {
  //element,index,array ,undefined
  console.log(a, b, c, d)
  return "Hello"
}
const ans = arr.forEach(temp);
// const ans = arr.map(temp);
console.log(ans)

//-------------------------------------------------
// const calculateArraySum = (input) => {

// }
// const res = calculateArraySum(arr);
// console.log(res)