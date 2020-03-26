const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a catetory name']
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [300, 'Description can not be more than 300 characters']
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  ceatedAt: {
    type: Date,
    default: Date.now
  }
});

categorySchema.pre('save', async function(next) {
  next();
});

categorySchema.pre('remove', async function(next) {
  await this.model('Product').deleteMany({ category: this._id });
  next();
});


module.exports = mongoose.model('Categoty', categorySchema);