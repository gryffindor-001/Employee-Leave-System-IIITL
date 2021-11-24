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
    try {
        var pend = await Leave.find({status: 'pending'})
        var jeet=0;
        await pend.forEach(async (e) => {
            // console.log('yo')
            var cur = moment().unix()
            var start = e.startTimeYear + '-' + e.startTimeMonth + '-' + e.startTimeDay + " 00:00+05:30"
            
            // console.log(start)
            start = moment(start, "YYYY-MM-DD hh:mm")
            // console.log(start)
            start = moment(start).unix()
            start = start/(60*60*24)
            cur = cur/(60*60*24)
            // console.log(start,cur)
            if(start<cur) {
                jeet++
                e.status = "reject"
                e.comments = "Admin was unable to respond in Time"
                await e.save()  
            }
        })
        var pending = await Leave.find({status: 'pending'})
        // console.log(pending)
        if(jeet>0)
        {
            return res.redirect('/admin/leave')
        }
        res.render("admin-leave", {pending})
    } catch (e) {
        console.log(e)
    }

    res.end()
})

router.post('/admin/leave', auth, async (req, res) => {
    try {    
        var leave = await Leave.findOne({_id: req.body._id})
        leave.status = req.body.status
        leave.comments = req.body.comment

        await leave.save()

        var user = await User.findOne({_id: leave.userID})
        var start = leave.startTimeYear + '-' + leave.startTimeMonth + '-' + leave.startTimeDay + " 00:00+05:30"
        start = moment(start, "YYYY-MM-DD hh:mm")
        var end = leave.endTimeYear + '-' + leave.endTimeMonth + '-' + leave.endTimeDay + " 00:00+05:30"
        end = moment(end, "YYYY-MM-DD hh:mm")
        
        start = moment(start).unix()
        end = moment(end).unix()
        var temp = (end-start)/(60*60*24)
        
        if(leave.status==="approve") {
            user.leavesLeft -= (temp+1)
            await user.save()
        }
        
        const pending = await Leave.find({userID: leave.userID, status: "pending"})

        pending.forEach(async (e) => {
            var estart = e.startTimeYear + '-' + e.startTimeMonth + '-' + e.startTimeDay + " 00:00+05:30"
            estart = moment(start, "YYYY-MM-DD hh:mm")
            var eend = e.endTimeYear + '-' + e.endTimeMonth + '-' + e.endTimeDay + " 00:00+05:30"
            eend = moment(end, "YYYY-MM-DD hh:mm")

            estart = moment(estart).unix()
            eend = moment(eend).unix()
            var etemp = (eend-estart)/(60*60*24)

            if(etemp>user.leavesLeft) {
                e.status = "reject"
                e.comments = "User does not have this many Leaves left"
                await e.save()
            }
        })
    } catch (e) {
        console.log(e)
    }

    res.redirect('/admin/leave')
})

router.get('/admin/users', auth, async (req, res) => {
    try { 
        const users = await User.find({}) 
        res.render('employees', {users})
    } catch (e) { 
        console.log(e) 
    }
    res.end()
})

router.post('/admin/users/:id', auth, async (req, res) => {
    try {
        const user = await User.findOne({_id: req.params.id})

        if(req.body.modify=='set') {
            user.leavesLeft = parseInt(req.body.amount)
        }
        else {
            user.leavesLeft += parseInt(req.body.amount)
        }
        if(user.leavesLeft < 0){
            user.leavesLeft = 0;
        }
        await user.save()
    } catch (e) {
        console.log(e)
    }

    res.redirect('/admin/users')
})

router.post('/admin/users', auth, async (req, res) => {
    try {
        const users = await User.find({})

        users.forEach(async (e) => {
            if(req.body.modify=='set') {
                e.leavesLeft = parseInt(req.body.amount)
            }
            else {
                e.leavesLeft += parseInt(req.body.amount)
            }
            if(e.leavesLeft < 0){
                e.leavesLeft = 0;
            }
            await e.save()
        })
    } catch (e) {
        console.log(e)
    }

    res.redirect('/admin/users')
})

module.exports = router