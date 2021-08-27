const express = require('express')
const User = require('../models/user.js')

const router = new express.Router()

router.get('/register', (req, res) => {
    res.render('register')
})

router.post('/register', async (req, res) => {
    const user = new User({
        name: req.body.username,
        email: req.body.email,
        password: req.body.password,
        gender: req.body.gender,
        post: req.body.designation,
        leavesLeft: 0
    })
    const token = await user.generateAuthToken()

    res.redirect('/')
})

module.exports = router