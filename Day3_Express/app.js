const express = require('express');
const app = express();
port = 2001;

app.get('/', (req, res) => {
  res.send('Hello, World!');
});
app.listen(port, () => {
  console.log('Server is running on port 2001');
});