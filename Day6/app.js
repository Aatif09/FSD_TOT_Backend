const express = require('express');
const morgan = require('morgan');
const app = express();
app.use((req, res, next) => {
  console.log("Request: " + req.url);
  next();
});
app.use(morgan());
//npm i morgan
require("./config/dbconfig.js");
const Product = require('./models/productModelss.js');
port = 2002;
app.use(express.json());
//http://www.localhost:2002/api/v1/products
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
    if (error.name == "ValidationError") {
      res.status(400).json({
        status: "Bad Request",
        message: "Data Validation Error",
      })
    }
    else {
      res.status(500).json({
        status: "Fail",
        message: "Internal Server Error",
      })
    };
  }
})
// {"title": "Chips","price": 20}

//http://www.localhost:2002/api/v1/products
// app.get('/api/v1/products', async (req, res) => {
//   try {
//     const products = await Product.find();
//     res.status(200);
//     res.json({
//       success: "Products retrieved successfully",
//       data: products
//     });
//   } catch (error) {
//     res.status(500).json({
//       status: "Fail",
//       message: "Internal Server Error",
//     })
//   }

// });
//http://www.localhost:2002/api/v1/products?q=c
app.get('/api/v1/products', async (req, res) => {
  try {
    const { q = "", size = 4, page = 1, fields = "" - __v } = req.query;
    console.log("Query=", q)
    const products = Product.find();
    if (q.length > 0) {
      const reg = new RegExp(q, 'i');
      products.where('title').regex(reg);
    }
    products.sort("price -title"); //- means ascending order
    products.limit(size);
    products.select(fields); // projection
    products.skip((page - 1) * size);
    const productss = await products;
    res.status(200);
    res.json({
      success: "Products retrieved successfully",
      data: productss
    });
  } catch (error) {

    console.error(error);
    res.status(500).json({
      status: "Fail",
      message: "Internal Server Error",
    })
  }

});
app.listen(port, () => {
  console.log('Server is running on port 2002');
});