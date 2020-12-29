const mongoose = require('mongoose')

const dish = mongoose.Schema({
    name: String,
    ingredients: [String],
    cost: Number,
    likes: Number,
    items: Number,
    image: String,
    from: String,
    to: String,
    isRegular: Boolean,
    selectedItems: Number
})
const hotelSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    owner: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: [true, 'Unique failed']
    },
    street: {
        type: String,
        required: true
    },
    landmark: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    dishes: {
        type: [dish],
        default: []
    },
    likes: {
        type: Number,
        default: 0
    }
})

hotelSchema.post('save', function (error, doc, next) {
    if (error.name === 'MongoError' && error.code === 11000) {
        next(new Error('Email already exists...'));
    } else {
        next(error);
    }
});

module.exports = mongoose.model('Hotel', hotelSchema)