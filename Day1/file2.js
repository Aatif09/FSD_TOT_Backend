
//---------------------------------------------------------------
// function read() {
//   const fs = require("node:fs");
//   const a = fs.readFileSync("./dummy.txt", "utf8");
//   console.log(a)
// }
//---------------------------------------------------------------

//---------------------------------------------------------------
// function read() {
//   const fs = require("node:fs");
//   const cb = (data) => {
//     console.log(data)
//   }
//   const a = fs.readFile("./dummy.txt", "utf8", cb);
//   console.log(a)
// }

function read() {
  const fs = require("node:fs");
  const cb = (err, data) => {
    if (err) {
      console.log("Error data")
    }
    else {
      console.log(data)
    }
  }
  const a = fs.readFile("./dummy.txt", "utf8", cb);
  console.log(a)
}
//---------------------------------------------------------------
module.exports = read;