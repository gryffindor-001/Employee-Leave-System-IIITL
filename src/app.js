const express = require("express")
const PORT = process.env.PORT

const app = express()

app.get('/', (req, res) => {
    res.send("NIPUN PAGAL!")
})

app.listen(PORT, () => {
    console.log("Server is up!")
})