const fspro = require("fs/promises");
const myreadfile = async (loc) => {
  try {
    const data = await fspro.readFile(loc, "utf8");
    const realData = JSON.parse(data);
    return realData;
  }
  catch (err) {
    console.log("Error reading file:", err.message);
  }
}

module.exports = { myreadfile }