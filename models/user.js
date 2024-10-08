const { createHmac, randomBytes } = require('crypto')
const { setMaxIdleHTTPParsers } = require('http')
const { Schema, model } = require('mongoose')

const { createTokenForUser }=require('../services/auth')

const userSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    salt: {
        type: String
    },
    password: {
        type: String,
        required: true,

    },
    profilePicURL: {
        type: String,
        default: '/images/default-user.jpg'
    },
    role: {
        type: String,
        enum: ['USER', 'ADMIN'],
        default: 'USER'
    }
}, { timestamps: true })

userSchema.pre('save', function (next) {
    const user = this
    if (!user.isModified('password'))
        return

    // const salt = 'necessityisthemilfofinvention'
    const salt = randomBytes(16).toString('hex')
    const hash = createHmac('sha256', salt).update(user.password).digest('hex')
    this.salt = salt
    this.password = hash
    next()
})

userSchema.static('matchPasswordAndGenerateToken', async function (email, password) {
    const user = await this.findOne({ email })
    if (!user)
        throw new Error('User not found')
    const salt = user.salt
    const hash = user.password
    const userProvidedHash = createHmac('sha256', salt).update(password).digest('hex')

    if(hash!=userProvidedHash)
        throw new Error('Incorrect password')

    const token=createTokenForUser(user) 
    return token
})

const User = model('user', userSchema)

module.exports = User