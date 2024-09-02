require('dotenv').config()

const express = require('express')
const path = require('path')
const userRouter = require('./routes/user')
const blogRouter = require('./routes/blog')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const { checkForAuthenticationCookie } = require('./middlewares/auth')
const Blog = require('./models/blog')

const app = express()
const PORT = process.env.PORT

mongoose.connect(process.env.MONGO_URL)
    // .connect('mongodb://127.0.0.1:27017/techtales')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err.message))

app.set('view engine', 'ejs')
app.set('views', path.resolve('./views'))

app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(checkForAuthenticationCookie('token'))
// app.use(express.static(path.resolve('./public')))
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', async (req, res) => {
    const allBlogs = await Blog.find({})
    res.render('home', {
        user: req.user,
        blogs: allBlogs
    })
})

app.use('/user', userRouter)
app.use('/blog', blogRouter)

// app.get('/signup', (req, res) => {
//     res.render('signup')
// })

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))