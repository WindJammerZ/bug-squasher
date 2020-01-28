const express = require('express')
const router = new express.Router
const auth = require('../middleware/auth')
const User = require('../models/user')

const {
    ADMINISTRATOR,
    GENERAL_USER,
    DEVELOPER_USER
} = require('../utils/consts')

const {
    USER_ROLES
} = require('../utils/consts')

const {
    isValidRole
} = require('../utils/utility')

//User creation endpoint
router.post('/', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({
            user,
            token
        })
    } catch (e) {
        res.status(400).send(e)
    }
})

//User login
router.post('/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({
            user,
            token
        })
    } catch (e) {
        res.status(400).send()
    }
})

//User logout
router.post('/logout', auth, async (req, res) => {

    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

//User logout all tokens
router.post('/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

//View user profile
router.get('/me', auth, async (req, res) => {
    res.send(req.user)
})

//Update user
router.patch('/me', auth, async (req, res) => {
    const allowedUpdates = ['name', 'email', 'password', 'avatar']
    const updates = Object.keys(req.body)
    const isValidOperation = udpates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({
            message: `Invalid updates!`
        })
    }

    try {
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()
        res.send(req.user)
    } catch (e) {
        res.status(500).send(e)
    }
})

//Delete user
router.delete('/me', auth, async (req, res) => {
    try {
        await req.user.remove()
        res.send(req.user)
    } catch (e) {
        res.status(500).send()
    }
})

//List all users with a certain role
router.get('/role', async (req, res) => {

    const userRoles = Array.isArray(req.query.role) ? req.query.role : [req.query.role]

    userRoles.forEach(userRole => {
        if (!isValidRole(USER_ROLES, userRole)) {
            return res.status(400).send({
                message: `Invalid user role.  Please contact your administrator.`
            })
        }
    })

    try {
        const users = await User.findByRole(userRoles)
        res.send(users)
    } catch (e) {
        res.status(500).send()
    }
})

//Get owner by id
router.get('/owner/:id', async (req, res) => {

    const userId = req.params.id

    try {
        const users = await User.findById(userId)
        res.send(users)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router