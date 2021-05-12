const User = require('../models/UserModel')
const Joi = require('@hapi/joi')
const jwt = require('jsonwebtoken')

const validateRegisterUser = (user) => {
    const JoiSchema = Joi.object({
        username: Joi.string().min(4).max(40).required(),
        email: Joi.string().min(10).max(100).required().email(),
        password: Joi.string().min(6).max(100).required()
    })
    return JoiSchema.validate(user)
}

const validateLoginUser = (user) => {
    const JoiSchema = Joi.object({
        email: Joi.string().min(10).max(100).required().email(),
        password: Joi.string().min(6).max(100).required()
    })
    return JoiSchema.validate(user)
}

exports.register = async (req, res) => {
    const { username, email, password } = req.body
    if(!username || !email || !password) return res.json({ message: 'Please fill all the Fields' })
    try{
        const { error } = validateRegisterUser(req.body)
        if(error) return res.json({ error: error.details[0].message })
        var user = await User.findOne({ email })
        if(user) return res.json({ message: 'User already Exists' })
        user = await User.create({ username, email, password })
        res.json({
            success: true,
            user
        })
    }
    catch(err){
        res.status(500).json({
            success: false,
            error: 'Internal Server Error'
        })
    }
}

exports.login = async (req, res) => {
    const { email, password } = req.body
    if(!email || !password) return res.json({ message: 'Please fill all the Fields' })
    try{
        const { error } = validateLoginUser(req.body)
        if(error) return res.json({ error: error.details[0].message })
        var user = await User.findOne({ email })
        if(!user) return res.json({ message: 'Invalid Email' })
        const isMatch = await user.comparePassword(password)
        if(!isMatch) return res.json({ message: 'Email or Password is Incorrect' })
        sendToken(user, 200, res)
    } catch(err){
        res.status(500).json({
            success: false,
            error: 'Internal Server Error'
        })
    }
}

exports.logout = (req, res) => {
    res.cookie('token', '', {
        httpOnly: true,
        expires: new Date(0)
    }).json({
        message: 'You are Logged Out'
    })
}

const sendToken = async (user, statusCode, res) => {
    const token = await user.getSignedToken()
    res.cookie('token', token, {
        httpOnly: true
    }).json({
        success: true,
        token: token
    })
}


exports.loggedIn = async (req, res) => {
    try{
        const token = req.cookies.token
        if(!token) return res.json(false)
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findById(decoded.id)
        if(!user) return res.json(false)
        res.json(true)
    } catch(err){
        res.json(false)
    }
}

exports.user = async (req, res) => {
    if(req.user) return res.json({
        user: req.user
    })
    return res.json({
        user: 'Invalid User'
    })
}