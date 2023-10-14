const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'user',
      required: true
    },
    products: [
      {
        name: {
          type: String,
          required: true
        },
        quantity: {
          type: Number,
          required: true
        },
        price: {
          type: String,
          required: true
        },
        image: {
          type: String,
          required: true
        }
      }
    ],
    totalPrice: {
      type: Number,
      required: true
    },
    shippingAddress: {
      name: {
        type: String,
        required: true
      },
      mobileNo: {
        type: String,
        required: true
      },
      houseNo: {
        type: String,
        required: true
      },
      street: {
        type: String,
        required: true
      },
      landmark: {
        type: String,
        required: true
      },
      postalCode: {
        type: String,
        required: true
      }
    },
    paymentMethod: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
)

const orderModel =
  mongoose.models?.order || mongoose.model('order', orderSchema)

module.exports = orderModel
