function sum(a, b) {
  console.log("Calculation sum");
  return a + b;
}
function mult(a, b) {
  console.log("Calculation Mul");
  return a * b;
}
const obj = {
  username: "aatif",
  add: sum,
  mul: mult
};
// module.exports = sum
module.exports = obj;

// export default sum;
