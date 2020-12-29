const express = require('express')
const { db } = require('./../models/hotel.model')

const Hotel = require('./../models/hotel.model')
const Dish = require('./../models/dish.model')
const Location = require('./../models/location.model')
const Offer = require('./../models/offer.model')

const hotelRouter = express.Router()


hotelRouter.get('/home', async (req, res) => {
  const user = req.user
  try {

    const newHotel = {
      _id: "5fe9f6715fcdf2113cec86a2",
      location: "Chennai",
      imageUrl: './../../../assets/location/chennai.jpg',
      desc: 'After a very lon waiting we are here in Detroit of Asia, our grand opening has been scheduled on 5 Jan,2021. We welcome all off you will a secret and special cashback on this eve...'
    }
    const topTodaySpecial = await Dish.find({}).limit(3)
    const specialOffers = await Offer.find({}).limit(3)
    res.status(200).send({ newHotel, topTodaySpecial, specialOffers })
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: 'Unable to fetch hotels' })
  }
})

hotelRouter.get('/locations', async (req, res) => {
  const address = ['Street name, Landmark', 'Area Name', 'City Name', 'State']
  try {
    const locations = await Location.find({})
    const result = locations.map(location => { return { _id: location._id, name: location.name } })
    res.status(200).send(result)
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: 'Unable to fetch locations' })
  }
})

hotelRouter.get('/dishes', async (req, res) => {

  try {
    const dishes = await Dish.find({}).populate('location')
    res.status(200).send(dishes)
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: 'Unable to fetch dishes' })
  }
})
hotelRouter.post('/dishes', async (req, res) => {
  const location = req.body
  try {
    const dishes = await Dish.find({ location: location._id }).populate('location')
    res.status(200).send(dishes)
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: 'Unable to fetch dishes' })
  }
})

hotelRouter.get('/offers', async (req, res) => {

  try {
    const seasonalOffers = await Offer.find({ isSeasonal: true })
    const offers = await Offer.find({ isSeasonal: false })
    res.status(200).send({ seasonalOffers, offers })
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: 'Unable to fetch offers' })
  }
})

hotelRouter.get('/cuisines', async (req, res) => {

  try {
    const data = await db.collection('cuisines').find({}).toArray()
    res.status(200).send(data)
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: 'Unable to fetch cuisines' })
  }
})

// hotelRouter.get('/:search', async (req, res) => {
//   const searchReg = new RegExp("^" + req.params.search, 'i');
//   const user = req.user
//   try {
//     const hotels = await Hotel.find({ name: searchReg, email: { $ne: user.email } })
//     console.log(hotels);
//     res.status(200).send({ hotels })
//   } catch (error) {
//     console.log(error);
//     res.status(400).send({ error: 'Unable to fetch hotels' })
//   }
// })

// hotelRouter.get('/dish/:id', async (req, res) => {
//   const user = req.user
//   const hotelId = req.params.id
//   try {
//     console.log(hotelId);
//     console.log(user);
//     const hotel = await Hotel.findOne({ _id: hotelId })
//     res.status(200).send({ hotel })
//   } catch (error) {
//     console.log(error);
//     res.status(400).send({ error: 'Unable to fetch hotel details...' })
//   }
// })

// hotelRouter.get('/city/:cityName', async (req, res) => {
//   const searchReg = new RegExp("^" + req.params.cityName, 'i');
//   const user = req.user
//   try {
//     const hotels = await Hotel.find({ city: searchReg, email: { $ne: user.email } })
//     console.log(hotels);
//     res.status(200).send({ hotels })
//   } catch (error) {
//     console.log(error);
//     res.status(400).send({ error: 'Unable to fetch hotels' })
//   }
// })

// hotelRouter.post('', async (req, res) => {
//   const user = req.user
//   try {
//     const hotel = new Hotel(req.body)
//     user.hotel = hotel._id
//     await hotel.save()
//     await user.save()
//     res.status(201).send({ message: 'Hotel added....', user })
//   } catch (error) {
//     console.log(error);
//     res.status(400).send({ error: 'Unable to add hotel' })
//   }
// })

// hotelRouter.post('/add-dish', async (req, res) => {
//   const user = req.user
//   const dish = req.body
//   try {
//     const hotel = await Hotel.findOne({ _id: user.hotel })
//     console.log(hotel);
//     hotel.dishes.push(dish)
//     hotel.markModified('dishes')
//     await hotel.save()
//     // console.log(resul.dishes);
//     res.status(201).send({ message: 'Dish added...', dish })
//   } catch (error) {
//     console.log(error);
//     res.status(400).send({ error: 'Unable to add dish...' })
//   }
// })

module.exports = hotelRouter
