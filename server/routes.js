let User = require('./models/user')
let Post = require('./models/post')
let jwt = require('jsonwebtoken')
let secret = require('./config').SECRET
const muler = require('multer')
const upload = muler({dest: './public/uploads/images'})

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
    app.post('/posts', requireAuth, upload.single('image'), (req, res) => {
            let post = new Post()
            post.title = req.body.title
            post.content = req.body.content
            if (req.file && req.file.filename) {
                post.image = req.file.filename
            }
            post.save(err => {
                if (err) {
                    return console.log(err)
                }
                res.status(200).json({
                    post: post,
                    message: '文章创建成功!'
                })
            })
        }
    )
    app.get('/posts', (req, res) => {
        Post.find({}, 'title image', (err, posts) => {
            if (err) {
                return console.log(err)
            }
            res.status(200).json({
                posts: posts,
                message: '获取文章成功!'
            })
        })
    })
    app.get('/posts/:post_id', (req, res) => {
        Post.findById({_id: req.params.post_id}, (err, post) => {
            if (err) {
                return res.status(422).json({error: err.message})
            }
            res.status(200).json({post: post})
        })
    })
    app.put('/posts/:post_id', requireAuth, upload.single('image'), (req, res) => {
        Post.findById({_id: req.params.post_id}, (err, post) => {
            if (err) {
                return res.status(422).json({error: error.message})
            }
            post.title = req.body.title
            post.content = req.body.content
            console.log(req.file.filename)
            if (req.file && req.file.filename) {
                post.image = req.file.filename
            }
            post.save(err => {
                if (err) {
                    return res.status(422).json({error: err.message})
                }
                return res.status(200).json({
                    post: post,
                    message: '文章更新成功'
                })
            })
        })
    })
    app.delete('/posts/:post_id', requireAuth, (req, res) => {
        let id = req.params.post_id
        Post.findById({_id: id}, (err, post) => {
            if (err) {
                return res.status(422).json({
                    error: err.message
                })
            }
            post.remove(err => {
                if (err) {
                    return res.status(422).json({
                        error: err.message
                    })
                }
                res.json({
                    id: id,
                    message: '文章删除成功'
                })
            })
        })
    })
}