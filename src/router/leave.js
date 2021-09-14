const express = require('express')
const auth = require('../middleware/auth')
const Leave = require('../models/leave')
const moment = require('moment')

const router = new express.Router()

router.get('/leave', auth, (req, res) => {
    res.render('leave')
})

router.post('/leave', auth, async (req, res) => {

    const leave = new Leave({
        userID: req.user._id,
        name: req.user.name,
        post: req.user.post,
        startTimeYear: parseInt(req.body.startDate.split("-")[0]),
        startTimeMonth: parseInt(req.body.startDate.split("-")[1]),
        startTimeDay: parseInt(req.body.startDate.split("-")[2]),
        endTimeYear: parseInt(req.body.endDate.split("-")[0]),
        endTimeMonth: parseInt(req.body.endDate.split("-")[1]),
        endTimeDay: parseInt(req.body.endDate.split("-")[2]),
        reason: req.body.reason,
        status: "pending",
        comment: ""
    })

    const startDate = req.body.startDate
    const endDate = req.body.endDate

    console.log(req.body)
    // console.log(moment(startDate).unix())
    // console.log(moment(endDate).unix())

    // await leave.save()

    res.redirect('/leave')
})

module.exports = router