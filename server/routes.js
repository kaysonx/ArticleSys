let User = require('./models/user')
let Post = require('./models/post')
let jwt = require('jsonwebtoken')
let secret = require('./config').SECRET

const generateToken = (user) => (
    jwt.sign(user, secret, {
        expiresIn: 3000
    })
)

const requireAuth = (req, res, next) => {
    let token = req.headers.authorization
    if (token) {
        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                if (err.name === 'TokenExpiredError') {
                    return res.status(401).json({error: 'token失效,请重新登录'})
                } else {
                    return res.status(401).json({error: '认证失败!'})
                }
            } else {
                if (decoded.admin) {
                    next()
                } else {
                    res.status(401).json({error: '认证失败'})
                }
            }
        })
    } else {
        return res.status(403).json({
            error: 'token不存在!'
        })
    }
}


module.exports = app => {
    app.get('/', (req, res) => {
        res.send('Hello Express!')
    })
    app.post('/auth/login', (req, res) => {
        User.findOne({username: req.body.username}, (err, user) => {
            if (err) return console.log(err)
            if (!user) {
                return res.status(403).json({error: '用户名不存在!'})
            }
            user.comparePassword(req.body.password, (err, isMatch) => {
                if (err) return console.log(err)
                if (!isMatch) {
                    return res.status(403).json({error: '密码错误!'})
                }
                return res.json({
                    token: generateToken({name: user.username, admin: user.admin}),
                    user: {name: user.username, admin: user.admin}
                })
            })
        })
    })
    app.post('/auth/signup', (req, res) => {
        let user = new User()
        user.username = req.body.username
        user.password = req.body.password
        user.save(err => {
            if (err) {
                return console.log(err)
            }
            return res.status(200).json({
                token: generateToken({name: user.username}),
                user: {name: user.username}
            })
        })
    })
    app.post('/posts', requireAuth, (req, res) => {
        let post = new Post()
        post.name = req.body.name
        post.content = req.body.content
        post.save(err => {
            if (err) {
                return console.log(err)
            }
            res.status(200).json({
                post: post,
                message: '文章创建成功!'
            })
        })
    })
}