const express = require('express');
const { myreadfile } = require('./utilsSync.js');
const app = express();
port = 2002;

app.get('/', (req, res) => {
  res.send('Hello, World!');
});
app.get('/data', (req, res) => {
  const data = myreadfile("./data.json");
  console.log(data)
  res.send(data);
});

app.listen(port, () => {
  console.log('Server is running on port 2002');
});