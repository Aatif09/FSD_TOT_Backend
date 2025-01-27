const fs = require("node:fs");
const a = fs.readFileSync("./output1.txt", "utf8");
console.log(a)