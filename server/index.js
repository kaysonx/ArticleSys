const express = require('express')
const config = require('./config')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const routes = require('./routes')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(morgan('dev'))

routes(app)

const mongoose = require('mongoose')
const User = require('./models/User')

mongoose.connect(config.DBURI)
let db = mongoose.connection
db.on('error', err => {
    console.log("connect failed!", err)
})
db.once('open', () => {
    console.log("connect success!")
    let user = new User({
        username: 'admin',
        password: '123456'
    })
    user.save()
})

app.listen(config.PORT, () => {
    console.log(`server is running on ${config.PORT}`)
})