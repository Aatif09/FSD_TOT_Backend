const mongoose = require('mongoose');
const { Schema } = mongoose;
const productSchema = new Schema({
  discount: Number,
  company: String,
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 1,
  },
  availablity: {
    type: String,
    enum: ["in-stock", "out-of-stock"],
    default: "in-stock",
  },


}, { timestamps: true });

const Product = mongoose.model('products', productSchema);


module.exports = Product;