const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('./../models/user.model')

exports.login = async (req, res) => {
  try {
    const email = req.body.email
    let user = await User.findOne({ email })
    if (user) {
      const password = req.body.password
      const passwordValidity = await bcrypt.compare(password, user.password)
      if (!user || !passwordValidity) {
        console.log('password invalid');
        return res.status(400).json({ error: 'Invalid login credentials...' })
      } else {
        user.token = await jwt.sign({ id: user._id }, process.env.JWT_STRING)
        await user.save()
        res.status(200).send({ user })
      }
    } else {
      const password = await bcrypt.hash(req.body.password, 8)
      user = new User({
        email,
        password
      })
      user.token = await jwt.sign({ id: user._id }, process.env.JWT_STRING)
      await user.save()
      res.status(201).send({ user })
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: error })
  }
}

exports.logout = async (req, res) => {
  try {
    const user = req.user
    user.token = null
    user.save()
    res.status(200).send({ message: 'Logged out successfully...' })
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: error })
  }
}

exports.authenticate = async (req, res, next) => {
  try {
    const token = req.headers['authorization'].split(' ')[1]
    const { id } = jwt.decode(token, process.env.JWT_STRING)
    const user = await User.findById(id)
    req.user = user
    next()
  } catch (error) {
    res.status(403).send(error)
  }
}

exports.adminAuthenticate = async (req, res, next) => {
  try {
    const token = req.headers['authorization'].split(' ')[1]
    const { id } = jwt.decode(token, process.env.JWT_STRING)
    console.log(id);
    const user = await User.findById(id)
    if (!user.isAdmin) {
      throw new Error()
    }
    req.user = user
    next()
  } catch (error) {
    res.status(403).send(error)
  }
}
