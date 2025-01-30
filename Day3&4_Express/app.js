const express = require('express');
const fspro = require('fs/promises');
const { myreadfilee, myreadfile, mywritefile, createNewId } = require('./utils.js');
const app = express();
port = 2001;
app.use(express.json()); // read the data from body(parse) from postman
app.get('/', (req, res) => {
  res.send('Hello, World!');
});
app.get('/data', async (req, res) => {
  const data = await myreadfilee("./data.json");
  console.log(data)
  res.send(data);
});
app.post('/add', (req, res) => {
  res.send({ name: "Aatif Jamshed", id: "2719" });
});
//http://www.localhost:2001/products
app.post('/products', async (req, res) => {
  //{"title": "chips","price": 18,"company": "Lays"}
  console.log(req.body)//body -raw 
  const newproduct = req.body;
  const data = [newproduct]
  await fspro.writeFile("./ writedata.json", JSON.stringify(data));
  res.json({
    status: "success",
  })
});
app.post('/product', async (req, res) => {
  //{"title": "chips","price": 18,"company": "Lays"}
  console.log(req.body)//body -raw 
  await fspro.writeFile("./ writedataa.json", []);
  res.json({
    status: "success",
  })
});

app.post('/newproduct', async (req, res) => {
  try {
    const newproduct = req.body;
    const arr = await myreadfile();
    const newId = await createNewId(arr); // for new id
    newproduct.id = newId;
    arr.push(newproduct)
    await mywritefile(arr);
    res.json({
      status: "success",
    })
  } catch (err) {
    console.log("Post reading file:", err.message);
    res.json({
      status: "fail",
    })
  }
});
//http://www.localhost:2001/getproduct
app.get('/getproduct', async (req, res) => {
  try {
    const data = await myreadfile("./writedata.json");
    // console.log(data)
    res.send(data);
    res.json({
      status: "success",
      res: data
    })
  } catch (err) {
    console.log("Post reading file:", err.message);
    res.json({
      status: "fail",
    })
  }
});
app.listen(port, () => {
  console.log('Server is running on port 2001');
});