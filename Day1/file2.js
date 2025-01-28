function read() {
  const fs = require("node:fs");
  const a = fs.readFileSync("./dummy.txt", "utf8");
  return a;
}
module.exports = read;