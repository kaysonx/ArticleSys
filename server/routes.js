let User = require('./models/User')
let jwt = require('jsonwebtoken')
let secret = require('./config').SECRET

const generateToken = (user) => (
    jwt.sign(user, secret, {
        expiresIn: 3000
    })
)

module.exports = app => {
    app.get('/', (req, res) => {
        res.send('Hello Express!')
    })
    app.post('/auth/login', (req, res) => {
        User.findOne({ username: req.body.username }, (err, user) => {
            if (err) return console.log(err)
            if (!user) {
                return res.status(403).json({ error: '用户名不存在!' })
            }
            user.comparePassword(req.body.password, (err, isMatch) => {
                if (err) return console.log(err)
                if (!isMatch) {
                    return res.status(403).json({ error: '密码错误!' })
                }
                return res.json({
                    token: generateToken({ name: user.username }),
                    user: { name: user.username }
                })
            })
        })
    })
}