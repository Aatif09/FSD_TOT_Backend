const fs = require("node:fs");
let ans = "HI";
fs.writeFileSync("./output1.txt", ans);
ans += "\n My name is thiss";
fs.writeFileSync("./output2.txt", ans);