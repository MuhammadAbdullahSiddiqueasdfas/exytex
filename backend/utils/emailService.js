const nodemailer = require('nodemailer');

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

// Send confirmation email to user
const sendConfirmationEmail = async (submission) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: submission.email,
      subject: 'Thank you for contacting Exytex - We\'ll be in touch soon!',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .footer { text-align: center; margin-top: 20px; color: #666; font-size: 14px; }
            .highlight { background: #e3f2fd; padding: 15px; border-radius: 5px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Thank You for Reaching Out!</h1>
              <p>We've received your message and will respond shortly</p>
            </div>
            <div class="content">
              <p>Dear ${submission.name},</p>
              
              <p>Thank you for contacting Exytex! We've successfully received your ${submission.formType} inquiry and our team will review it shortly.</p>
              
              <div class="highlight">
                <h3>Your Submission Details:</h3>
                <p><strong>Name:</strong> ${submission.name}</p>
                <p><strong>Email:</strong> ${submission.email}</p>
                <p><strong>Form Type:</strong> ${submission.formType}</p>
                <p><strong>Submitted:</strong> ${new Date(submission.submittedAt).toLocaleString()}</p>
                ${submission.service ? `<p><strong>Service:</strong> ${submission.service}</p>` : ''}
              </div>
              
              <p>Our team typically responds within 24 hours during business days. If your inquiry is urgent, please don't hesitate to call us directly.</p>
              
              <p>In the meantime, feel free to explore our website to learn more about our services and recent projects.</p>
              
              <p>Best regards,<br>
              The Exytex Team</p>
            </div>
            <div class="footer">
              <p>This is an automated message. Please do not reply to this email.</p>
              <p>© ${new Date().getFullYear()} Exytex. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('✅ Confirmation email sent to:', submission.email);
    
  } catch (error) {
    console.error('❌ Error sending confirmation email:', error);
    throw error;
  }
};

// Send notification email to admin
const sendNotificationEmail = async (submission) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_USER, // Send to admin email
      subject: `New ${submission.formType} Form Submission - ${submission.name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #ff6b35; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .field { margin: 10px 0; padding: 10px; background: white; border-radius: 5px; }
            .urgent { border-left: 4px solid #ff6b35; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🚨 New Form Submission</h1>
              <p>Form Type: ${submission.formType.toUpperCase()}</p>
            </div>
            <div class="content">
              <div class="field urgent">
                <strong>Name:</strong> ${submission.name}
              </div>
              <div class="field">
                <strong>Email:</strong> ${submission.email}
              </div>
              <div class="field">
                <strong>Phone:</strong> ${submission.phone || 'Not provided'}
              </div>
              <div class="field">
                <strong>Company:</strong> ${submission.company || 'Not provided'}
              </div>
              ${submission.service ? `<div class="field"><strong>Service:</strong> ${submission.service}</div>` : ''}
              ${submission.role ? `<div class="field"><strong>Role:</strong> ${submission.role}</div>` : ''}
              ${submission.budget ? `<div class="field"><strong>Budget:</strong> ${submission.budget}</div>` : ''}
              <div class="field">
                <strong>Message:</strong><br>
                ${submission.message}
              </div>
              <div class="field">
                <strong>Submitted At:</strong> ${new Date(submission.submittedAt).toLocaleString()}
              </div>
              <div class="field">
                <strong>IP Address:</strong> ${submission.ipAddress || 'Unknown'}
              </div>
              
              <p style="margin-top: 20px; text-align: center;">
                <a href="${process.env.FRONTEND_URL}/admin" style="background: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
                  View in Admin Panel
                </a>
              </p>
            </div>
          </div>
        </body>
        </html>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('✅ Notification email sent to admin');
    
  } catch (error) {
    console.error('❌ Error sending notification email:', error);
    throw error;
  }
};

module.exports = {
  sendConfirmationEmail,
  sendNotificationEmail
};