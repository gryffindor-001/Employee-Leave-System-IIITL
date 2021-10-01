const express = require('express')
const auth = require('../middleware/adminAuth')
const Leave = require('../models/leave')

const router = new express.Router()

router.get('/admin', auth, (req, res) => {
    res.render("home", {home: 3})
})

router.get('/admin/leave', auth, async (req, res) => {
    const pending = await Leave.find({status: 'pending'})
    res.render("admin-leave", {pending})
})

router.post('/admin/leave', auth, async (req, res) => {
    var leave = await Leave.findOne({_id: req.body._id})
    leave.status = req.body.status
    leave.comment = req.body.comment

    await leave.save()
    
    res.redirect('/admin/leave')
})

module.exports = router