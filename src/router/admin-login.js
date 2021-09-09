const express = require('express')
const Admin = require('../models/admin')
const unauth = require('../middleware/unauth')

const router = new express.Router()

router.get('/adminLogin', unauth, (req, res) => {
    res.render('login', {error: req.query.error, auth: req.query.auth, type: 'admin'})
})

router.post('/adminLogin', async (req, res) => {
    try{
        const admin = await Admin.findByCredentials(req.body.email, req.body.password)

        const token = await admin.generateAuthToken()
        res.cookie('auth_token', token)
        res.redirect('/admin')
    } catch (e) {
        res.redirect('/login?error=1')
    }
    
})

module.exports = router