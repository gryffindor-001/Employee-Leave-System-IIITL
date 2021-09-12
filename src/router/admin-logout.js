const express = require('express')
const Admin = require('../models/admin')
const auth = require('../middleware/adminAuth')
const jwt = require('jsonwebtoken')

const router = new express.Router()

router.get('/adminLogout', auth, async (req, res) => {
    const user = req.user
    const token = req.token
    
    try {
        user.tokens = user.tokens.filter((t) => t.token!==token)
        await user.save()
    } catch (e) {
        res.redirect('/admin')
    }

    res.redirect('/')
})

router.get('/adminLogoutAll', auth, async (req, res) => {
    const user = req.user
    
    try {
        user.tokens = []
        await user.save()
    } catch (e) {
        res.redirect('/admin')
    }

    res.redirect('/')
})

module.exports = router