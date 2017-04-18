const express = require('express')
const PORT = require('./config').PORT
const app = express()

app.get('/',(req,res)=>{
    res.send('Hello Express!')
})

app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`)
})