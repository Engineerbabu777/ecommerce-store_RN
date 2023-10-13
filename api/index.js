const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const userRoutes = require('./controllers/userController')
const User = require('./models/userModel')
const addressRoutes = require('./controllers/addressController')

const app = express()
const PORT = 8080

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// HANDLING ENDPOINTS !!!
app.use('/api/user/', userRoutes) // HANDLING ALL USER ROUTES!
app.use('/api/address', addressRoutes) // HANDLING ALL ADDRESS ROUTES!

// VERIFICATION ROUTE!
app.get('/verify/:token', async (req, res) => {
  try {
    const { token } = req.params

    // FIND THE USER WITH THE TOKEN!
    const userDoc = await User.findOne({ verificationToken: token })

    // IF USER DOC NOT FOUND!
    if (!userDoc?.email) {
      return res.status(400).json({ error: false, message: 'Invalid Token!' })
    }
    // VERIFY THE USER!
    userDoc.verificationToken = undefined
    userDoc.verified = true

    await userDoc.save()

    return res
      .status(200)
      .json({ success: true, message: 'User Verified successfully' })
  } catch (error) {
    console.log('ERROR WHILE VERIFYING TOKEN!')
    return res
      .status(504)
      .json({ error: true, message: 'Verification Failed!' })
  }
})

// CONNECTING TO DATABASE!
mongoose
  .connect(
    'mongodb+srv://awaismumtaz0099:778677867786a..@cluster0.8uv8o4x.mongodb.net/',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
  .then(() => {
    console.log('Connected to database!')
  })
  .catch(err => console.log('Error connecting to database', err.message))

// CREATING OUR APP!
app.listen(PORT, () => {
  console.log('Running on Port-> 8080')
})
