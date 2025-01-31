const express = require('express');
const app = express();
require("./config/dbconfig.js");
port = 2002;
app.listen(port, () => {
  console.log('Server is running on port 2002');
});