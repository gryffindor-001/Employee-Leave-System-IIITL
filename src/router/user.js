const express = require('express')
const auth = require('../middleware/auth')

const router = new express.Router()

router.get('/user', auth, (req, res) => {
    res.render('home', {home: 2})
})

router.get('/user/me', auth, (req, res) => {
    res.render('profile')
})

module.exports = router