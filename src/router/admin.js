const express = require('express')

const router = new express.Router()

router.get('/admin', (req, res) => {
    res.send("Hello Admin!")
})

module.exports = router