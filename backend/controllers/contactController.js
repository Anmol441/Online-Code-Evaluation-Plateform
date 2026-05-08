const Contact = require('../models/Contact');
const nodemailer = require('nodemailer');


// ============================
// SEND MESSAGE
// ============================
exports.sendMessage = async (req, res) => {

  try {

    const { name, email, message } = req.body;

    const contact = await Contact.create({
      name,
      email,
      message
    });

    res.status(201).json({
      success: true,
      message: 'Message sent successfully',
      data: contact
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// ============================
// GET ALL MESSAGES
// ============================
exports.getAllMessages = async (req, res) => {

  try {

    const contacts = await Contact.find().sort({
      createdAt: -1
    });

    res.status(200).json({
      success: true,
      data: contacts
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// ============================
// REPLY MESSAGE
// ============================
exports.replyMessage = async (req, res) => {

  try {

    const { reply } = req.body;

    const contact = await Contact.findById(req.params.id);

    if (!contact) {

      return res.status(404).json({
        success: false,
        message: 'Message not found'
      });
    }


    // EMAIL TRANSPORTER
    const transporter = nodemailer.createTransport({

      service: 'gmail',

      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });


    // SEND EMAIL
    await transporter.sendMail({

      from: process.env.EMAIL_USER,

      to: contact.email,

      subject: 'Reply from CodeEval Support',

      html: `
        <h2>CodeEval Support</h2>

        <p>Hello ${contact.name},</p>

        <p>${reply}</p>

        <br/>

        <p>Thank you for contacting us.</p>
      `
    });


    // SAVE REPLY
    contact.reply = reply;
    contact.replied = true;

    await contact.save();


    res.status(200).json({
      success: true,
      message: 'Reply sent successfully'
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};