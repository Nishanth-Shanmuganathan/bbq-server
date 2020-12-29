const mongoose = require('mongoose')

const Order = {
  dishId: String,
  quantity: Number,
  price: Number,
}
const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: [true, 'Unique failed']
  },
  password: {
    type: String,
    required: true
  },
  isVerified: {
    type: Boolean,
    default: 'false'
  },
  token: {
    type: String
  },
  orders: {
    type: [Order],
    default: []
  }
})

userSchema.post('save', function (error, doc, next) {
  if (error.name === 'MongoError' && error.code === 11000) {
    next(new Error('Email already exists...'));
  } else {
    next(error);
  }
});

module.exports = mongoose.model('User', userSchema)
