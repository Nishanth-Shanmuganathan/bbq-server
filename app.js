const path = require('path')

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')

const authRouter = require('./src/routes/auth.route')
const hotelsRouter = require('./src/routes/hotels.route')
const { authenticate } = require('./src/controllers/auth.controller')

const app = express()
app.use(express.json())
app.use(bodyParser.json())
app.use(cors())

app.use('', (req, res, next) => {
  console.log(req.url);
  next()
})
app.use('/auth', authRouter)
app.use('/server', hotelsRouter)

app.use('/', express.static(path.join(__dirname, 'Bbq')))

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, 'Bbq', 'index.html'))
})


mongoose.connect(process.env.DB_LINK, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})
  .then(res => {
    app.listen(process.env.PORT, () => { console.log('Listening at ' + process.env.PORT); })
  })
  .catch(err => {
    console.log(err);
    console.log('Network not available...');
    app.use('', (req, res) => {
      res.status(500).send({ error: 'Network not available...' })
    })
  })
