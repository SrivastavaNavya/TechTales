const { Router } = require('express')
const { handleUserSignUp, handleShowUserSignIn, handleShowUserSignUp, handleUserSignIn, handleUserLogout } = require('../controllers/user')

const router=Router()

router.get('/signin', handleShowUserSignIn)

router.get('/signup', handleShowUserSignUp)

router.post('/signup', handleUserSignUp)

router.post('/signin', handleUserSignIn)

router.get('/logout', handleUserLogout)

module.exports=router

