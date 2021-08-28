require('./db/mongoose')
const express = require("express")
const path = require('path')
const registerRouter = require('./router/register')
const loginRouter = require('./router/login')
const PORT = process.env.PORT

const app = express()
app.set('view engine', 'ejs')

//views folder
app.set('views', path.join(__dirname,'../templates/views'))

//public folder
app.use(express.static(path.join(__dirname, '../public')))

//body parser
app.use(express.urlencoded({ extended: false }))

//routers
app.use(registerRouter)
app.use(loginRouter)

app.get('/', (req, res) => {
    data=[1,2,3,4]
    res.render('test',{data})
})

app.listen(PORT, () => {
    console.log("Server is up!")
})