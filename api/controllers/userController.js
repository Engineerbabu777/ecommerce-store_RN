const router = require('express').Router()
const userModel = require('../models/userModel')
const User = require('../models/userModel')
const verificationEmail = require('../utils/sendMail')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const constant = require('../constants')



// WE ARE HANDLING REGISTER ROUTE HERE!!
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body

    // IF EMAIL IS ALREADY EXISTS!
    const userExists = await User.findOne({ email: email })

    if (userExists?.email) {
      return res
        .status(200)
        .json({ error: true, message: 'EMAIL ALREADY EXISTS!' })
    }

    // GENERATE TOKEN!
    const token = crypto.randomBytes(32).toString('hex')

    // CREATE NEW USER!
    const newDoc = await User.create({
      name,
      email,
      password,
      verificationToken: token
    })

    // SEND VERIFICATION EMAIL TO USER!
    await verificationEmail(email, token)

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
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log('EMAIL IS : ', email)

    // GET IF USER EXISTS!
    const isUserFound = await userModel.findOne({ email })

    if (!isUserFound?.email) {
      return res.status(401).json({ error: true, message: 'User not Found!' })
    }

    // MATCH THE PASSWORDS!
    if (isUserFound?.password !== password) {
      return res
        .status(401)
        .json({ error: true, message: 'Passwords Not matched!' })
    }

    // ELSE GENERATE TOKEN!
    const token = jwt.sign({ userId: isUserFound?._id }, constant.SECRET_KEY)

    return res.status(200).json({ success: true, token })
  } catch (error) {
    console.log('ERROR WHILE CREATING NEW USER! ', error.message)
    res
      .status(500)
      .json({ error: true, message: 'ERROR WHILE CREATING NEW USER!' })
  }
})


// WE ARE HANDLING USER INFO ROUTE HERE!
router.get('/profile/:userId',async(req,res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving the user profile" });
  }
});



module.exports = router;
