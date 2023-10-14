const express = require('express')
const userModel = require('../models/userModel')
const Order = require('../models/orderModel')

const router = express.Router()

// HANDLING POST REQUEST1
router.post('/new', async (req, res) => {
  try {
    const { userId, cartItems, totalPrice, shippingAddress, paymentMethod } =
      req.body

    const user = await userModel.findById(userId)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    //create an array of product objects from the cart Items
    const products = cartItems.map(item => ({
      name: item?.title,
      quantity: item.quantity,
      price: item.price,
      image: item?.image
    }))

    //create a new Order
    const order = new Order({
      user: userId,
      products: products,
      totalPrice: totalPrice,
      shippingAddress: shippingAddress,
      paymentMethod: paymentMethod
    })

    await order.save()

    res.status(200).json({ message: 'Order created successfully!' })
  } catch (error) {
    console.log('error creating orders', error)
    res.status(500).json({ message: 'Error creating orders' })
  }
})

// WE ARE HANDLING USER ORDER HERE!
router.get('/:userId', async (req, res) => {
  try {
    const userId = req.params.userId

    const orders = await Order.find({ user: userId }).populate('user')

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: 'No orders found for this user' })
    }

    res.status(200).json({ orders })
  } catch (error) {
    res.status(500).json({ message: 'Error' })
  }
})


module.exports = router
