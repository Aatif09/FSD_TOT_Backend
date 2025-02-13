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
  quantity: {
    type: Number,
    min: 0,
    default: 1,
  },
  thumbnail: String,
}, { timestamps: true });

const Product = mongoose.model('products', productSchema);


module.exports = Product;