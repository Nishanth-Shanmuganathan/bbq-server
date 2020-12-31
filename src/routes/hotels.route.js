const express = require('express')
const { db } = require('./../models/hotel.model')

const Hotel = require('./../models/hotel.model')
const Dish = require('./../models/dish.model')
const Location = require('./../models/location.model')
const User = require('./../models/user.model')
const Offer = require('./../models/offer.model')
const { authenticate, adminAuthenticate } = require('../controllers/auth.controller')

const hotelRouter = express.Router()


hotelRouter.get('/home', authenticate, async (req, res) => {
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

hotelRouter.get('/locations', authenticate, async (req, res) => {
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

hotelRouter.get('/dishes', authenticate, async (req, res) => {

  try {
    const dishes = await Dish.find({}).populate('location')
    res.status(200).send(dishes)
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: 'Unable to fetch dishes' })
  }
})
hotelRouter.post('/dishes', authenticate, async (req, res) => {
  const location = req.body
  try {
    const dishes = await Dish.find({ location: location._id }).populate('location')
    res.status(200).send(dishes)
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: 'Unable to fetch dishes' })
  }
})

hotelRouter.get('/offers', authenticate, async (req, res) => {

  try {
    const seasonalOffers = await Offer.find({ isSeasonal: true })
    const offers = await Offer.find({ isSeasonal: false })
    res.status(200).send({ seasonalOffers, offers })
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: 'Unable to fetch offers' })
  }
})

hotelRouter.get('/cuisines', authenticate, async (req, res) => {

  try {
    const data = await db.collection('cuisines').find({}).toArray()
    res.status(200).send(data)
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: 'Unable to fetch cuisines' })
  }
})

hotelRouter.post('/dish', adminAuthenticate, async (req, res) => {
  try {
    const dish = new Dish(req.body)
    await dish.save()
    const location = await Location.findOne({ _id: dish.location })
    let result = {}
    result._id = dish._id
    result.name = dish.name
    result.imageUrl = dish.imageUrl
    result.location = location
    console.log(result);
    res.status(200).send(result)
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: 'Unable to add dish' })
  }
})
hotelRouter.post('/offer', adminAuthenticate, async (req, res) => {
  try {
    const offer = new Offer(req.body)
    await offer.save()
    res.status(200).send(offer)
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: 'Unable to add offer' })
  }
})
hotelRouter.post('/location', adminAuthenticate, async (req, res) => {
  try {
    const location = new Location(req.body)
    // await location.save()
    res.status(200).send(location)
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: 'Unable to add location' })
  }
})
hotelRouter.get('/location/:locationId', adminAuthenticate, async (req, res) => {
  try {
    const locationId = req.params.locationId
    const location = await Location.findOne({ _id: locationId })
    res.status(200).send(location)
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: 'Unable to fetch location' })
  }
})

hotelRouter.post('/booking', authenticate, async (req, res) => {
  let user = req.user
  try {
    // if (user.isAdmin) {
    //   throw new Error()
    // }
    const booking = req.body
    booking.location = booking.location._id
    user.bookings.push(booking)
    await user.save()
    res.status(200).send({ message: 'Booking confirmed', user })
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: 'Unable to confirm booking' })
  }
})




module.exports = hotelRouter
