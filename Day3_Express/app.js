const express = require('express');
const fspro = require('fs/promises');
const { myreadfile } = require('./utils.js');
const app = express();
port = 2001;
app.use(express.json()); // read the data from body(parse) from postman
app.get('/', (req, res) => {
  res.send('Hello, World!');
});
app.get('/data', async (req, res) => {
  const data = await myreadfile("./data.json");
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
app.listen(port, () => {
  console.log('Server is running on port 2001');
});