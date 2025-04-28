import { Resend } from "resend";

export default async function EmailService(email: string, otp: number) {
    const resend = new Resend(process.env.RESEND_API);
    await resend.emails.send({
      from: "tjr@tjr.digital",
      to: email,
      subject: "🎉 Your SignUp is Almost Complete! ✅",
      html: `
        <html>
        <head>
          <style>
            /* Importing Poppins font from Google Fonts */
            @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap');
  
            /* General styles */
            body {
              font-family: 'Poppins', sans-serif;
              background-color: #f8f9fa;
              color: #495057;
              margin: 0;
              padding: 0;
              -webkit-text-size-adjust: none;
            }
            h1, h2, h3 {
              margin: 0;
            }
            p {
              line-height: 1.6;
            }
  
            /* Main container */
            .email-container {
              width: 100%;
              max-width: 600px;
              margin: 0 auto;
              background-color: #ffffff;
              border-radius: 8px;
              overflow: hidden;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            }
  
            /* Header styles */
            .email-header {
              background-color: #4CAF50;
              color: #ffffff;
              text-align: center;
              padding: 20px;
            }
  
            .email-header h2 {
              font-size: 24px;
            }
  
            /* OTP Section */
            .otp-section {
              padding: 20px;
              text-align: center;
              background-color: #FF5722;
              color: #ffffff;
            }
  
            .otp-section h3 {
              font-size: 30px;
              margin: 10px 0;
            }
  
            /* Body Text */
            .email-body {
              padding: 20px;
              color: #495057;
            }
  
            .email-body p {
              font-size: 16px;
            }
  
            .email-body p strong {
              font-weight: bold;
              font-size: 18px;
              color: #FF5722;
            }
  
            .email-footer {
              background-color: #f1f1f1;
              text-align: center;
              padding: 20px;
              font-size: 14px;
              color: #777777;
              border-top: 1px solid #dddddd;
            }
  
            /* Responsive Design */
            @media only screen and (max-width: 600px) {
              .email-container {
                width: 100% !important;
              }
  
              .email-header h2 {
                font-size: 20px;
              }
  
              .otp-section h3 {
                font-size: 24px;
              }
  
              .email-body p {
                font-size: 14px;
              }
            }
          </style>
        </head>
        <body>
          <div class="email-container">
            <!-- Email Header -->
            <div class="email-header">
              <h2>🎉 Congrats on Starting Your Journey!</h2>
            </div>
  
            <!-- OTP Section -->
            <div class="otp-section">
              <h3>Your OTP: <strong>${otp}</strong></h3>
            </div>
  
            <!-- Email Body -->
            <div class="email-body">
              <p>Hello there!</p>
              <p>We’re thrilled to have you onboard. To complete your sign-up process, please use the One-Time Password (OTP) below:</p>
              <p><strong>${otp}</strong></p>
              <p>This OTP is valid for the next 5 minutes. If you didn’t request this, feel free to ignore this email.</p>
              <p>Thanks for choosing us!</p>
            </div>
  
            <!-- Email Footer -->
            <div class="email-footer">
              <p>Best regards,<br />The Team at Onboarding</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });}