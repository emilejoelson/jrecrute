const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 465,
  secure: true,
  logger: true,
  debug: true,
  secureConnection: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const sendConfirmationEmail = async (email, token) => {
    const confirmationUrl = `${process.env.FRONTEND_URL}/confirm-newsletter?token=${token}`;
  
    const mailOptions = {
      from: `"Consult Collab" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Confirmation de votre abonnement",
      html: `
        <html>
          <head>
            <meta charset="UTF-8">
            <style>
              body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                background-color: #f4f7fc;
                margin: 0;
                padding: 0;
                line-height: 1.6;
              }
    
              .main-container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
    
              .email-container {
                background-color: #ffffff;
                border-radius: 12px;
                box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
                padding: 30px;
                margin: 20px 0;
              }
    
              .header {
                text-align: center;
                padding-bottom: 20px;
                border-bottom: 2px solid #3498db;
                margin-bottom: 30px;
              }
    
              .header h1 {
                color: #2c3e50;
                font-size: 24px;
                margin: 0;
                padding: 0;
              }
    
              .content {
                color: #34495e;
                font-size: 16px;
                line-height: 1.8;
                margin-bottom: 30px;
              }
    
              .button {
                display: block;
                width: 200px;
                background-color: #3498db;
                color: #ffffff;
                text-align: center;
                padding: 14px 0;
                margin: 30px auto;
                border-radius: 6px;
                text-decoration: none;
                font-weight: 600;
              }
    
              .footer {
                text-align: center;
                margin-top: 30px;
                padding-top: 20px;
                border-top: 1px solid #eee;
                color: #7f8c8d;
                font-size: 14px;
              }
            </style>
          </head>
          <body>
            <div class="main-container">
              <div class="email-container">
                <div class="header">
                  <h1>Confirmez votre abonnement</h1>
                </div>
    
                <div class="content">
                  <p>Merci de vous être abonné à notre newsletter ! Pour finaliser votre inscription, veuillez cliquer sur le bouton ci-dessous :</p>
    
                  <a href="${confirmationUrl}" class="button">Confirmer mon abonnement</a>
    
                  <p>Si vous n’avez pas fait cette demande, vous pouvez ignorer ce message en toute sécurité.</p>
    
                  <p>Ce lien de confirmation expirera dans 24 heures.</p>
                </div>
              </div>
    
              <div class="footer">
                <p>&copy; ${new Date().getFullYear()} - Votre entreprise</p>
                <p>Ceci est un message automatique. Merci de ne pas y répondre directement.</p>
              </div>
            </div>
          </body>
        </html>
      `,
    };
  
    return new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error sending confirmation email:", error);
          reject(error);
        } else {
          console.log("Confirmation email sent successfully:", info.response);
          resolve(info);
        }
      });
    });
  };

  module.exports =  sendConfirmationEmail;