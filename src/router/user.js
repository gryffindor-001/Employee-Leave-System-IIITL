const express = require('express')
const moment = require('moment')
const auth = require('../middleware/auth')
const Leave = require('../models/leave')

const router = new express.Router()

router.get('/user', auth, (req, res) => {
    res.render('home', {home: 2})
})

router.get('/user/me', auth, async (req, res) => {
    const user = req.user

    var approved = await Leave.find({userID: req.user._id, status: "approve"})
    var rejected = await Leave.find({userID: req.user._id, status: "reject"})

    approved.forEach(async (e) => {
        var cur = moment().unix()
        var start = e.startTimeYear + '-' + e.startTimeMonth + '-' + e.startTimeDay + " 00:00+05:30"
        start = moment(start, "YYYY-MM-DD hh:mm")
        start = moment(start).unix()

        if(start<cur && (cur-start)/(24*60*60)>(365/2)) {
            await Leave.deleteOne({_id: e._id})
        }
    })

    rejected.forEach(async (e) => {
        var cur = moment().unix()
        var start = e.startTimeYear + '-' + e.startTimeMonth + '-' + e.startTimeDay + " 00:00+05:30"
        start = moment(start, "YYYY-MM-DD hh:mm")
        start = moment(start).unix()

        if(start<cur && (cur-start)/(24*60*60)>(365/2)) {
            await Leave.deleteOne({_id: e._id})
        }
    })

    approved = await Leave.find({userID: req.user._id, status: "approve"})
    rejected = await Leave.find({userID: req.user._id, status: "reject"})

    res.render('profile', {user, approved, rejected})
})

module.exports = router