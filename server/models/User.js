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

UserSchema.methods.comparePassword = function (password, callback) {
    bcrypt.compare(password, this.password, function (err, isMathch) {
        if(err) return callback(err)
        callback(null, isMathch)
    })
}

module.exports = mongoose.model('User', UserSchema)