const fs = require("fs");

const myreadfile = (loc) => {
  try {
    const data = fs.readFileSync(loc, "utf8");
    return data;
  }
  catch (err) {
    console.log("Error reading file:", err.message);
  }
}

module.exports = { myreadfile };
