const express = require('express')
const User = require('../models/user.js')

const router = new express.Router()

router.get('/login', (req, res) => {
    res.render('login', {error: req.query.error})
})

router.post('/login', async (req, res) => {
    try{
        const user = await User.findByCredentials(req.body.email, req.body.password)

        const token = await user.generateAuthToken()
        res.redirect('/')
    } catch (e) {
        res.redirect('/login?error=1')
    }
    
})

module.exports = router