const express = require('express')
const config = require('./config')
const app = express()

const mongoose = require('mongoose')

mongoose.connect(config.DBURI)
let db = mongoose.connection
db.on('error', err => {
    console.log("connect failed!",err)
})
db.once('open', ()=>{
    console.log("connect success!")
})

app.get('/',(req,res)=>{
    res.send('Hello Express!')
})

app.listen(config.PORT,()=>{
    console.log(`server is running on ${config.PORT}`)
})