const fspro = require("fs/promises");

// const readFile = () => {

//   const a = fspro.readFile("./dummy.txt", "utf8");
//   a.then((res) => { console.log(res) }).catch(() => { console.log("err") });
// }

const readFile1 = async () => {

  const a = await fspro.readFile("./dummy.txt", "utf8");
  console.log(a)
}
readFile1();