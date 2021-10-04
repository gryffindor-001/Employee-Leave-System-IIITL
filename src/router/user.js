const express = require('express')
const auth = require('../middleware/auth')
const Leave = require('../models/leave')

const router = new express.Router()

router.get('/user', auth, (req, res) => {
    res.render('home', {home: 2})
})

router.get('/user/me', auth, async (req, res) => {
    const user = req.user

    const approved = await Leave.find({userID: req.user._id, status: "approve"})
    const rejected = await Leave.find({userID: req.user._id, status: "reject"})

    res.render('profile', {user, approved, rejected})
})

module.exports = router