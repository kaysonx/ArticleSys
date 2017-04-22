let mongoose = require('mongoose')
let Schema = mongoose.Schema
// let bcrypt = require('bcrypt')
let bcrypt = require('bcryptjs')

let UserSchema = new Schema(
    {
        username: { type: String, unique: true, required: true },
        password: { type: String, required: true }
    },
    {
        timestamps:true
    })

//箭头函数this是global拿不到user
// UserSchema.pre('save', (next) => {
//     let user = this,
//         SALT_FACTOR = 5
//     bcrypt.genSalt(SALT_FACTOR, (err, salt) => {
//         if(err) return next(err)
//         bcrypt.hash(user.password, salt, (err, hash) => {
//             if(err) return next(err)
//             console.log("object");
//             user.password = hash
//             next()
//         })
//     })
// })

UserSchema.pre('save', function (next) {
    var user = this, SALT_FACTOR = 5
    bcrypt.genSalt(SALT_FACTOR, function (err, salt) {
        if (err) return next(err)
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err)
            user.password = hash
            next()
        })
    })
})

module.exports = mongoose.model('User', UserSchema)