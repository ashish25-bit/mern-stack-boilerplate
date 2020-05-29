const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/User')
const auth = require('../middleware/auth')

// register the user
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body
    try {
        let user = await User.findOne({ email })
        // if user exists terminate register
        if (user)
            return res.status(400).send('User Already exists')

        user = new User({
            name,
            email,
            password
        })

        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(password, salt)

        await user.save()

        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(
            payload,
            'boilerplate-secret-token',
            { expiresIn: 360000 },
            (err, token) => {
                if (err) throw err
                res.json({ token, user })
            })

    }
    catch (err) {
        console.log(err.message)
        res.status(500).send('Server error')
    }
})

// get auth user
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password')
        res.json(user)
    }
    catch (err) {
        console.error(err.message)
        res.status(500).send('Server error')
    }
})

// user login
router.post('/login', async (req, res) => {
    const { email, password } = req.body

    try {
        let user = await User.findOne({ email })

        // if the email is worng
        if (!user)
            return res.status(400).send('User Doesn\'t exixts')

        const isMatch = await bcrypt.compare(password, user.password)
        // if the password is worng
        if (!isMatch)
            return res.status(400).send('Invalid Credentials')

        const payload = {
            user: {
                id: user.id
            }
        }
        jwt.sign(
            payload,
            'boilerplate-secret-token',
            { expiresIn: 360000 },
            (err, token) => {
                if (err) throw err
                res.json({ token, user })
            })
    }
    catch (err) {
        console.log(err.message)
        res.status(500).send('Server error')
    }
})

module.exports = router
