const express = require('express')
const router = express.Router()
const passport = require('passport')
const upload = require('../utils/multer')



const { userRegister, userLogin,
    forgotPassword, postOTP, updatePassword
} = require('../controllers/userController')


router.post('/register', userRegister)

router.post('/login', userLogin)

router.post('/forgotPassword', forgotPassword)

router.post('/postOTP', postOTP)

router.post('/updatePassword', passport.authenticate('jwt', { session: false }), updatePassword)






module.exports = router