const express = require('express');
const app = express();
require("./config/dbconfig.js");
const Product = require('./models/productModels.js');
port = 2002;
app.use(express.json());
app.post('/api/v1/products', async (req, res) => {
  try {
    const newProduct = req.body;
    const doc = await Product.create(newProduct);
    res.status(201);
    res.json({
      success: "Product created successfully",
      data: doc
    });
  } catch (error) {
    console.error("asasa", error);
  }
})
app.listen(port, () => {
  console.log('Server is running on port 2002');
});