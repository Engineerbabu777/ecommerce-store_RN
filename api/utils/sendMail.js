const nodemailer = require('nodemailer')

const verificationEmail = async(email, token) => {
  const transporter = nodemailer.createTransport({
    // CONFIGURATION!
    service: 'gmail',
    auth: {
      user: 'projectbase999@gmail.com',
      pass: 'yjrf hpvb zoyd ijmd'
    }
  })

  // COMPOSE THE EMAIL MESSAGE!
  const mailOptions = {
    from: 'projectbase999@gmail.com',
    to: email,
    subject: 'Verify your email address',
    text: `Please click the following link to verify your email: http://localhost:8080/verify/${token}`
  }

  // SEND EMAIL!
  try {
    console.log('Sending email...');
     const email=await transporter.sendMail(mailOptions);
     console.log('email is:',email)
     console.log('Email sent...')
  } catch (error) {
    console.log('Error while sending email!');
  }
}

module.exports = verificationEmail
