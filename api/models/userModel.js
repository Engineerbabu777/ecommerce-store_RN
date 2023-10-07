const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    verified: {
      default: false,
      type: Boolean
    },
    verificationToken: String,
    addresses: [
      {
        name: String,
        mobileNo: String,
        houseNo: String,
        street: String,
        landmark: String,
        city: String,
        country: String,
        postalCode: String
      }
    ],
    orders: [{ type: mongoose.Schema.ObjectId, ref: 'order' }]
  },
  {
    timestamps: true
  }
)

const userModel = mongoose.models?.user || mongoose.model('user', userSchema)

module.exports = userModel
