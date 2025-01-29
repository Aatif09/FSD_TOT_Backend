const express = require('express');
const { myreadfile } = require('./utils.js');
const app = express();
port = 2001;

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
app.listen(port, () => {
  console.log('Server is running on port 2001');
});