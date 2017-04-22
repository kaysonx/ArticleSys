let mongoose = require('mongoose')
let Schema = mongoose.Schema

let UserSchema = new Schema(
    {
        username: { type: String, unique: true, required: true },
        password: { type: String, required: true }
    },
    {
        timestamps:true
    })

module.exports = mongoose.model('User', UserSchema)