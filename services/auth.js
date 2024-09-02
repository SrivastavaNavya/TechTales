// import { model } from 'mongoose'

const JWT = require('jsonwebtoken')

const secret = '$omesecret+h1s1s'

const createTokenForUser = (user) => {
    const payload = {
        _id: user.id,
        fullName: user.fullName,
        email: user.email,
        profilePicURL: user.profilePicURL,
        role: user.role
    }
    const token=JWT.sign(payload, secret)
    return token
}

const validateUser=(token)=>{
    const payload=JWT.verify(token, secret)
    return payload
}

module.exports={
    createTokenForUser,
    validateUser
}