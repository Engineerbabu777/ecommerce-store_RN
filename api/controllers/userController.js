const router = require('express').Router()
const User = require('../models/userModel')
const verificationEmail = require('../utils/sendMail')
const crypto = require('crypto')

// WE ARE HANDLING REGISTER ROUTE HERE!!
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body

    console.log('RECEVING DATA-> ', { name, email, password })

    // IF EMAIL IS ALREADY EXISTS!
    const userExists = await User.findOne({ email: email })

    console.log('IS USER EXISTS-> ', userExists)

    if (userExists?.email) {
      return res
        .status(200)
        .json({ error: true, message: 'EMAIL ALREADY EXISTS!' })
    }

    // console.log('Generating token....');

    // GENERATE TOKEN!
    const token = crypto.randomBytes(32).toString('hex')

    console.log('TOKEN IS OK! Now Saving User')

    // CREATE NEW USER!
    const newDoc = await User.create({
      name,
      email,
      password,
      verificationToken: token
    })

    console.log('User is saved! now sending email function calling!')

    // SEND VERIFICATION EMAIL TO USER!
    await verificationEmail(email, token)

    console.log('EMAIL IS SEND!')

    return res
      .status(200)
      .json({ success: true, message: 'USER CREATED!', newDoc })
  } catch (error) {
    console.log('ERROR WHILE CREATING NEW USER! ', error.message)
    res
      .status(500)
      .json({ error: true, message: 'ERROR WHILE CREATING NEW USER!' })
    res.end()
  }
})

// WE ARE HANDLING LOGIN ROUTE HERE!
router.get('/login', async (req, res) => {
  try {
  } catch (error) {
    console.log('ERROR WHILE CREATING NEW USER! ', error.message)
    res
      .status(500)
      .json({ error: true, message: 'ERROR WHILE CREATING NEW USER!' })
  }
})

// WE ARE HANDLING USER INFO ROUTE HERE!

module.exports = router
