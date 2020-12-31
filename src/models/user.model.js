const mongoose = require('mongoose')

const Order = {
  date: {
    type: Date,
    required: true
  },
  guests: {
    type: Number,
    required: true
  },
  location: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  session: {
    type: String,
    required: true
  },
  timeslot: {
    type: String,
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  isCompleted: {
    type: Boolean,
    default: "false"
  }
}
const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    default: 'false'
  },
  token: {
    type: String
  },
  bookings: {
    type: [Order],
    default: []
  }
})

// userSchema.post('save', function (error, doc, next) {
//   if (error.name === 'MongoError' && error.code === 11000) {
//     next(new Error('Email already exists...'));
//   } else {
//     next(error);
//   }
// });

module.exports = mongoose.model('User', userSchema)
