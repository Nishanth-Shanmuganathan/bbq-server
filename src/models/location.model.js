const mongoose = require('mongoose')

const locationSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: [String],
    required: true
  },
  bookings: {
    type: [{
      date: String,
      session: String,
      timeslot: String,
      guests: Number
    }],
    default: [],
  }
})


module.exports = mongoose.model('Location', locationSchema)
