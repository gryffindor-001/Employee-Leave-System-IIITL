require('./db/mongoose')
const express = require("express")
const path = require('path')
const registerRouter = require('./router/register')
const loginRouter = require('./router/login')
const logoutRouter = require('./router/logout')
const adminLoginRouter = require('./router/admin-login')
const cookieParser = require('cookie-parser')
const PORT = process.env.PORT

//middleware
const auth = require('./middleware/auth')

const app = express()
app.set('view engine', 'ejs')

//views folder
app.set('views', path.join(__dirname,'../templates/views'))

//public folder
app.use(express.static(path.join(__dirname, '../public')))

//cookie parser
app.use(cookieParser())

//body parser
app.use(express.urlencoded({ extended: false }))

//routers
app.use(registerRouter)
app.use(loginRouter)
app.use(logoutRouter)
app.use(adminLoginRouter)

app.get('/', auth, (req, res) => {
    // console.log(req.user)
    res.render('test')
})

app.listen(PORT, () => {
    console.log("Server is up!")
})