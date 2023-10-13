const express = require('express')
const router = express.Router()
const userModel = require('../models/userModel')
// const addressModel = require('../models/addressModel');

// GET ALL ADDRESSES OF USER!
router.get('/:userId', async (req, res) => {
  try {
    const userId = req.params.userId

    const user = await userModel.findById(userId)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    const addresses = user.addresses
    res.status(200).json({ addresses })
  } catch (error) {
    res.status(500).json({ message: 'Error retrieveing the addresses' })
  }
})

// STORE A NEW ADDRESS END POINT!
router.post('/newAddress', async (req, res) => {
  try {
    const { userId, address } = req.body

    console.log("YOUR ADDRESS:", address);
    //find the user by the Userid
    const user = await userModel.findById(userId)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    //add the new address to the user's addresses array
    user.addresses.push(address)

    //save the updated user in te backend
    await user.save()

    res.status(200).json({ message: 'Address created Successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Error Adding new address' })
  }
})

module.exports = router
