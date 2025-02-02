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
  try {
    console.log(req.body)//body -raw 
    const newproduct = req.body;
    const data = [newproduct]
    await mywritefile(data);
    res.json({
      status: "success",
    })
  } catch (error) {
    res.json({
      status: "Failure",
    })
  }
});
app.post('/newproducts', async (req, res) => {
  try {
    console.log(req.body);
    const newProduct = req.body;
    let existingData = [];
    existingData = await myreadfile();
    existingData.push(newProduct);
    await mywritefile(existingData);
    res.json({
      status: "success",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "Failure",
      message: error.message,
    });
  }
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
//http://www.localhost:2001/updateproduct/3     (PATCH)
app.patch('/updateproduct/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const newProducti = req.body;
    const arr = await myreadfile("./writedata.json");

    const productIndex = arr.findIndex((obj) => obj.id == productId);

    if (productIndex != -1) {
      const oldProduct = arr[productIndex];
      const newProduct = { ...oldProduct, ...newProducti }; // Merge old and new product
      arr[productIndex] = newProduct;
      await mywritefile(arr);
      res.status(200);
      res.json({
        status: "Success",
      });
    } else {
      res.status(400);
      res.json({
        status: "Index not found again",
      });
    }
  } catch (err) {
    console.log("Error:", err.message); // Fix the variable name from 'error' to 'err'
    res.status(500);
    res.json({
      status: "fail",
    });
  }
});

app.delete('/delproducts/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const arr = await myreadfile();
    const foundIndex = arr.findIndex((obj) => { return obj.id == id });
    console.log(foundIndex);
    if (foundIndex !== -1) {
      arr.splice(foundIndex, 1); //no. of elements to be deleted
      // we can also use delete but it creates holes
      await mywritefile(arr);
      res.json({
        status: "Success",
        id
      });
    }
    else {
      res.json({
        status: "Product not found",
        id
      });
    }
  } catch (error) {
    console.error("Error:", err.message);
    res.json({
      status: "Can not delete fail",
      error: err.message,
      code: 201
    });
  }

})
app.listen(port, () => {
  console.log('Server is running on port 2001');
});