const fspro = require("fs/promises");
const myreadfilee = async (loc) => {
  try {
    const textdata = await fspro.readFile(loc, "utf8");
    const realData = JSON.parse(textdata);
    return realData;
  } catch (err) {
    console.log("Error reading file:", err.message);
  }
}
const path = "./writedata.json";
const myreadfile = async () => {
  try {
    const textdata = await fspro.readFile(path, "utf8");
    console.log(textdata)
    const realData = JSON.parse(textdata);
    return realData;
  } catch (err) {
    console.log("Error reading file:", err.message);
    return [];
  }
}
const mywritefile = async (data) => {
  try {
    const text = JSON.stringify(data);
    await fspro.writeFile(path, text);
    return true;
  } catch (err) {
    console.log("Mywritefile reading file:", err.message);
    return false;
  }
}
module.exports = { myreadfilee, myreadfile, mywritefile }