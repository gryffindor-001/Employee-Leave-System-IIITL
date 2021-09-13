const express = require('express')
const auth = require('../middleware/auth')
const Leave = require('../models/leave')

const router = new express.Router()

router.get('/leave', auth, (req, res) => {
    res.render('leave')
})

router.post('/leave', (req, res) => {
    res.redirect('/user')
})

module.exports = router