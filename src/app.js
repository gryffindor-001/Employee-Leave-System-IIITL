const express = require("express")
const PORT = process.env.PORT

const app = express()
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    data=[1,2,3,4]
    res.render('test',{data})
})

app.listen(PORT, () => {
    console.log("Server is up!")
})