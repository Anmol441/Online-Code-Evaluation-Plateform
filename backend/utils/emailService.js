const nodemailer = require('nodemailer');
const logger = require('./logger');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

const sendEmail = async (options) => {
  try {
    const mailOptions = {
      from: `Code Platform <${process.env.EMAIL_USER}>`,
      to: options.email,
      subject: options.subject,
      html: options.html
    };

    const info = await transporter.sendMail(mailOptions);
    logger.info(`Email sent: ${info.messageId}`);
    return { success: true };
  } catch (error) {
    logger.error(`Email error: ${error.message}`);
    return { success: false, error: error.message };
  }
};

const sendVerificationEmail = async (email, otp, name) => {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .otp-box { background: white; border: 2px dashed #667eea; padding: 20px; text-align: center; margin: 20px 0; border-radius: 8px; }
        .otp-code { font-size: 32px; font-weight: bold; color: #667eea; letter-spacing: 5px; }
        .footer { text-align: center; margin-top: 20px; color: #888; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎯 Welcome to Code Platform!</h1>
        </div>
        <div class="content">
          <p>Hi <strong>${name}</strong>,</p>
          <p>Thank you for registering with Code Platform. To complete your registration, please verify your email address using the OTP below:</p>
          
          <div class="otp-box">
            <p style="margin: 0; color: #666;">Your Verification Code</p>
            <div class="otp-code">${otp}</div>
            <p style="margin: 10px 0 0; color: #888; font-size: 14px;">Valid for ${process.env.OTP_EXPIRE_MINUTES || 10} minutes</p>
          </div>
          
          <p>If you didn't create an account, please ignore this email.</p>
          <p>Happy Coding! 🚀</p>
        </div>
        <div class="footer">
          <p>&copy; ${new Date().getFullYear()} Code Platform. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return await sendEmail({
    email,
    subject: 'Verify Your Email - Code Platform',
    html
  });
};

const sendPasswordResetEmail = async (email, otp, name) => {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .otp-box { background: white; border: 2px solid #f5576c; padding: 20px; text-align: center; margin: 20px 0; border-radius: 8px; }
        .otp-code { font-size: 32px; font-weight: bold; color: #f5576c; letter-spacing: 5px; }
        .warning { background: #fff3cd; border-left: 4px solid #ffc107; padding: 10px; margin: 15px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🔐 Password Reset Request</h1>
        </div>
        <div class="content">
          <p>Hi <strong>${name}</strong>,</p>
          <p>We received a request to reset your password. Use the OTP below to proceed:</p>
          
          <div class="otp-box">
            <p style="margin: 0; color: #666;">Password Reset Code</p>
            <div class="otp-code">${otp}</div>
            <p style="margin: 10px 0 0; color: #888; font-size: 14px;">Valid for ${process.env.OTP_EXPIRE_MINUTES || 10} minutes</p>
          </div>
          
          <div class="warning">
            <strong>⚠️ Security Notice:</strong> If you didn't request this password reset, please ignore this email and your password will remain unchanged.
          </div>
        </div>
        <div class="footer">
          <p>&copy; ${new Date().getFullYear()} Code Platform. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return await sendEmail({
    email,
    subject: 'Password Reset Request - Code Platform',
    html
  });
};

module.exports = {
  sendEmail,
  sendVerificationEmail,
  sendPasswordResetEmail
};
