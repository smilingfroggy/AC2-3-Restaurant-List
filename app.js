const express = require('express')
const app = express()
const routes = require('./routes')
const mongoose = require('mongoose')
const RestaurantList = require('./models/restaurants')
const methodOverride = require('method-override')
const exphbs = require('express-handlebars')
const port = 3000


// 與資料庫連線
mongoose.connect('mongodb://localhost/restaurant-list')
const db = mongoose.connection
db.on('error', () => {
  console.log('Failed to connect with MongoDB')
})
db.once('open', () => {
  console.log('MongoDB connected!')
})

// template engine setting
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// static files
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

// method-override
app.use(methodOverride('_method'))

// router setting
app.use(routes)


app.listen(port, () => {
  console.log(`Express is listening at localhost:${port}`)
})