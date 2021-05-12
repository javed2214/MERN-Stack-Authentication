const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

UserSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

UserSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password)
}

UserSchema.methods.getSignedToken = async function(){
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE })
}

module.exports = mongoose.model('User', UserSchema)
