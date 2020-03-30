const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a product name'],
    maxlength: [100, 'Product name can not be more than 100 characters']
  },
  unitPrice: {
    type: Number,
    required: [true, 'Please add an unitPrice']
  },
  unitInStock: {
    type: Number,
    required: [true, 'Please add an unitInStock']
  },
  imageUrl: {
    type: String,
    default: 'nopic.jpg'
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  category: {
    type: mongoose.Schema.ObjectId,
    ref: 'Category',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});


module.exports = mongoose.model('Product', productSchema);