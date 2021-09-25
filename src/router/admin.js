const express = require('express')
const auth = require('../middleware/adminAuth')

const router = new express.Router()

router.get('/admin', auth, (req, res) => {
    res.render("home", {home: 3})
})

module.exports = router