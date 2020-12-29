const mongoose = require('mongoose')

const dishSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true
  },
  location: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Location'
  }
})


module.exports = mongoose.model('Dish', dishSchema)
