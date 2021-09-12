const express = require('express')
const auth = require('../middleware/adminAuth')

const router = new express.Router()

router.get('/admin', auth, (req, res) => {
    res.send("Hello Admin!")
})

module.exports = router