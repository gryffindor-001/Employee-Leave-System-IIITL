const express = require('express')
const moment = require('moment')
const auth = require('../middleware/adminAuth')
const Leave = require('../models/leave')
const User = require('../models/user')
const router = new express.Router()

router.get('/admin', auth, (req, res) => {
    res.render("home", {home: 3})
})

router.get('/admin/leave', auth, async (req, res) => {
    var pending = await Leave.find({status: 'pending'})

    pending.forEach(async (e) => {
        var cur = moment().unix()
        var start = e.startTimeYear + '-' + e.startTimeMonth + '-' + e.startTimeDay
        start = moment(start)
        start = moment(start).unix()

        start = start/(60*60*24)
        cur = cur/(60*60*24)

        if(start<cur) {
            e.status = "reject"
            e.comments = "Admin was unable to respond in Time"
            await e.save()  
        }
    })

    pending = await Leave.find({status: 'pending'})

    res.render("admin-leave", {pending})
})

router.post('/admin/leave', auth, async (req, res) => {
    var leave = await Leave.findOne({_id: req.body._id})
    leave.status = req.body.status
    leave.comments = req.body.comment

    await leave.save()

    var user = await User.findOne({_id: leave.userID})
    var start = leave.startTimeYear + '-' + leave.startTimeMonth + '-' + leave.startTimeDay
    start = moment(start)
    var end = leave.endTimeYear + '-' + leave.endTimeMonth + '-' + leave.endTimeDay
    end = moment(end)
    
    start = moment(start).unix()
    end = moment(end).unix()
    var temp = (end-start)/(60*60*24)
    
    if(leave.status==="approve") {
        user.leavesLeft -= temp
        await user.save()
    }
    
    const pending = await Leave.find({_id: leave.userID, status: "pending"})

    pending.forEach(async (e) => {
        var estart = e.startTimeYear + '-' + e.startTimeMonth + '-' + e.startTimeDay
        estart = moment(start)
        var eend = e.endTimeYear + '-' + e.endTimeMonth + '-' + e.endTimeDay
        eend = moment(end)

        estart = moment(estart).unix()
        eend = moment(eend).unix()
        var etemp = (eend-estart)/(60*60*24)

        if(etemp>user.leavesLeft) {
            e.status = "reject"
            e.comments = "User does not have this many Leaves left"
            await e.save()
        }
    })

    res.redirect('/admin/leave')
})

module.exports = router