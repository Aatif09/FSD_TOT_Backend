---

--> in app.js :: make a new request handler for post

`
const express = require('express');
require('./config/dbConfig.js');
const Product = require('./models/productModel.js');

    const app = express();

    app.use(express.json());

    app.post("/api/v1/products", async (req, res)=>{
        try{
            const newProduct = req.body;
            const doc = await Product.create(newProduct);
            res.status(201);
            res.json({
                status: "success",
                data: doc,
            });
        }
        catch(err){
            console.log(err._message);
            if(err.name == "ValidationError"){
                res.status(400).json({
                    status: 'fail',
                    message: 'Data validation failed',
                })
            }
            else{
                res.status(500).json({
                    status: 'fail',
                    message: 'Internal Server Error',
                })
            }
        }
    })

    app.listen(1401, ()=>{console.log('-------- SERVER STARTED --------');})

## `

## RUN the app, POST request with no title and no price, and generate validation error

POST http://localhost:1401/api/v1/products
RAW --> JSON --> {
"title" : "",
"price" : 100,
}

---

## READ Operation

app.get("/api/v1/products", (req, res)=>{
try{
const data = await Product.find();
res.json({
status: "success",
data: {
products: data
}
})
}catch(err){
res.status(500).json({
status: 'fail',
message: 'Internal Server Error'
})
}
});
