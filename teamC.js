const { add } = require("./teamA.js");

const calculateArraySum = (input) => {
  let sum = 0;
  const temp1 = (a) => {
    // sum += a;
    sum = add(a, sum);
  }
  input.forEach(temp1);
  return sum;
}
//ES6+
// if key and value are same. it will work
module.exports = { calculateArraySum };