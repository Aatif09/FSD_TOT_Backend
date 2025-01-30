const fspro = require("fs/promises");
const myreadfilee = async (loc) => {
  try {
    const textdata = await fspro.readFile(loc, "utf8");
    const realData = JSON.parse(textdata);
    return realData;
  } catch (err) {
    console.log("Error reading file:", err.message);
    return [];
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
const createNewId = async (arr) => {
  const oldid = 1;
  const arraylength = arr.length;
  if (arraylength > 0) {
    const lastitem = arr[arraylength - 1];
    const lastitemid = lastitem.id;
    return lastitemid + 1;
  }
  return 1;
}
module.exports = { myreadfilee, myreadfile, mywritefile, createNewId }