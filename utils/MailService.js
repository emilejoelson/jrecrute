const nodemailer = require("nodemailer");
const path = require("path");
require("dotenv").config();

const sendEmailToCompany = async ({
  personalInfo,
  professionalInfo,
  academicInfo,
  cvFile,
}) => {
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

  const mailOptions = {
    from: `${personalInfo.firstName} ${personalInfo.lastName} <${personalInfo.email}>`,
    to: process.env.EMAIL_TO,
    subject: `Nouvelle candidature - ${personalInfo.firstName} ${personalInfo.lastName}`,
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
              max-width: 700px;
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
              font-size: 28px;
              margin: 0;
              padding: 0;
            }
            
            .header p {
              color: #7f8c8d;
              margin: 10px 0 0;
            }
            
            .profile-section {
              background-color: #f8fafc;
              border-radius: 8px;
              padding: 25px;
              margin-bottom: 25px;
            }
            
            .profile-header {
              display: block;
              margin-bottom: 20px;
            }
            
            .profile-header h2 {
              color: #2c3e50;
              font-size: 22px;
              margin: 0;
              padding-bottom: 10px;
              border-bottom: 2px solid #3498db;
            }
            
            .info-grid {
              display: grid;
              grid-template-columns: repeat(2, 1fr);
              gap: 20px;
              margin-top: 20px;
            }
            
            .info-item {
              padding: 15px;
              background-color: #ffffff;
              border-radius: 8px;
              border-left: 4px solid #3498db;
            }
            
            .info-label {
              color: #7f8c8d;
              font-size: 14px;
              margin-bottom: 5px;
            }
            
            .info-value {
              color: #2c3e50;
              font-size: 16px;
              font-weight: 600;
            }
            
            .cv-section {
              background-color: #ebf5fb;
              border-radius: 8px;
              padding: 20px;
              margin-top: 25px;
              text-align: center;
            }
            
            .cv-label {
              color: #2980b9;
              font-size: 18px;
              font-weight: 600;
              margin-bottom: 15px;
            }
            
            .highlight-box {
              background-color: #e8f6ff;
              border-left: 4px solid #3498db;
              padding: 15px;
              margin: 20px 0;
              border-radius: 4px;
            }
            
            .footer {
              text-align: center;
              margin-top: 30px;
              padding-top: 20px;
              border-top: 1px solid #eee;
              color: #7f8c8d;
              font-size: 14px;
            }
            
            .additional-info {
              color: #34495e;
              font-style: italic;
              text-align: center;
              margin: 20px 0;
            }

            .motivation-section {
              background-color: #f7f9fc;
              border-radius: 8px;
              padding: 25px;
              margin: 25px 0;
            }

            .motivation-header {
              color: #2c3e50;
              font-size: 20px;
              margin-bottom: 15px;
              border-bottom: 2px solid #3498db;
              padding-bottom: 10px;
            }

            .motivation-content {
              color: #34495e;
              font-size: 16px;
              line-height: 1.8;
            }
          </style>
        </head>
        <body>
          <div class="main-container">
            <div class="email-container">
              <div class="header">
                <h1>Nouvelle Candidature</h1>
                <p>Un nouveau candidat a soumis son CV</p>
              </div>
              
              <div class="profile-section">
                <div class="profile-header">
                  <h2>Informations du Candidat</h2>
                </div>
                
                <div class="info-grid">
                  <div class="info-item">
                    <div class="info-label">Nom Complet</div>
                    <div class="info-value">${personalInfo.firstName} ${
      personalInfo.lastName
    }</div>
                  </div>
                  
                  <div class="info-item">
                    <div class="info-label">Email</div>
                    <div class="info-value">${personalInfo.email}</div>
                  </div>
                  
                  <div class="info-item">
                    <div class="info-label">Téléphone</div>
                    <div class="info-value">${
                      personalInfo.telephone || "Non fourni"
                    }</div>
                  </div>
                  
                  <div class="info-item">
                    <div class="info-label">Poste Actuel</div>
                    <div class="info-value">${
                      professionalInfo.currentPosition
                    }</div>
                  </div>
                  
                  <div class="info-item">
                    <div class="info-label">Poste Recherché</div>
                    <div class="info-value">${
                      professionalInfo.desiredPosition
                    }</div>
                  </div>
                  <div class="info-item">
                    <div class="info-label">Expérience en Télétravail</div>
                    <div class="info-value">${
                      professionalInfo.hasRemoteExperience
                        ? "J'ai déjà fait un télétravail"
                        : "Je n'ai pas encore fait un télétravail"
                    }</div>
                  </div>
                </div>
              </div>

              <div class="motivation-section">
                <h3 class="motivation-header">Motivation du Candidat</h3>
                <div class="motivation-content">
                  ${academicInfo.motivation}
                </div>
              </div>
              
              <div class="cv-section">
                <div class="cv-label">CV du Candidat</div>
                <p>Le CV du candidat est joint à cet email</p>
              </div>
              
              <div class="additional-info">
                <p>Merci de traiter cette candidature dans les meilleurs délais.</p>
              </div>
            </div>
            
            <div class="footer">
              <p>&copy; ${new Date().getFullYear()} - Système de Recrutement</p>
              <p>Cet email a été envoyé automatiquement. Merci de ne pas y répondre directement.</p>
            </div>
          </div>
        </body>
      </html>
    `,
    attachments: [
      {
        path: cvFile,
        filename: path.basename(cvFile),
      },
    ],
  };

  // Send the email with Promise
  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        reject(error);
      } else {
        console.log("Email sent successfully:", info.response);
        resolve(info);
      }
    });
  });
};

module.exports = sendEmailToCompany;
