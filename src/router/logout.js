const express = require('express')
const User = require('../models/user.js')

const router = new express.Router()

router.post('/logout', async (req, res) => {
    res.redirect('/')
})

module.exports = router