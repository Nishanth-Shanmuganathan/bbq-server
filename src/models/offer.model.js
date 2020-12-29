const mongoose = require('mongoose')

const offerSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  isSeasonal: {
    type: Boolean,
    default: "false"
  },
  validTill: {
    type: String,
    required: this.isSeasonal
  }
})


module.exports = mongoose.model('Offer', offerSchema)
