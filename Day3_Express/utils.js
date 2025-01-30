const fspro = require("fs/promises");
const myreadfile = async (loc) => {
  try {
    const textdata = await fspro.readFile(loc, "utf8");
    const realData = JSON.parse(textdata);
    return realData;
  } catch (err) {
    console.log("Error reading file:", err.message);
  }
}
module.exports = { myreadfile }