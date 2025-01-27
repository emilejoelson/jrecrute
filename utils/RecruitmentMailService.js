const nodemailer = require("nodemailer");

const sendEmailToAdmin = async (recruitmentRequest) => {
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
    from: `${recruitmentRequest.companyName} <${recruitmentRequest.contactEmail}>`,
    to: process.env.EMAIL_TO,
    subject: `Nouvelle demande de recrutement - ${recruitmentRequest.companyName}`,
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
            }
            
            .section {
              background-color: #f8fafc;
              border-radius: 8px;
              padding: 25px;
              margin-bottom: 25px;
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
            
            .urgency-badge {
              display: inline-block;
              padding: 8px 16px;
              border-radius: 20px;
              font-weight: bold;
              text-align: center;
            }
            
            .urgent {
              background-color: #ff4757;
              color: white;
            }
            
            .soon {
              background-color: #ffa502;
              color: white;
            }
            
            .normal {
              background-color: #2ed573;
              color: white;
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
                <h1>Nouvelle Demande de Recrutement</h1>
              </div>
              
              <div class="section">
                <div class="info-grid">
                  <div class="info-item">
                    <div class="info-label">Entreprise</div>
                    <div class="info-value">${
                      recruitmentRequest.companyName
                    }</div>
                  </div>
                  
                  <div class="info-item">
                    <div class="info-label">Email</div>
                    <div class="info-value">${
                      recruitmentRequest.contactEmail
                    }</div>
                  </div>
                  
                  <div class="info-item">
                    <div class="info-label">Téléphone</div>
                    <div class="info-value">${
                      recruitmentRequest.phoneNumber
                    }</div>
                  </div>
                  
                  <div class="info-item">
                    <div class="info-label">Poste Recherché</div>
                    <div class="info-value">
                      ${recruitmentRequest.position}
                      ${
                        recruitmentRequest.otherPosition
                          ? ` - ${recruitmentRequest.otherPosition}`
                          : ""
                      }
                    </div>
                  </div>
                  
                  <div class="info-item">
                    <div class="info-label">Budget Mensuel</div>
                    <div class="info-value">
                      ${recruitmentRequest.monthlyBudget.min} - ${
      recruitmentRequest.monthlyBudget.max
    } €
                    </div>
                  </div>
                  
                  <div class="info-item">
                    <div class="info-label">Urgence</div>
                    <div class="info-value">
                      <div class="urgency-badge ${
                        recruitmentRequest.urgency === "Très urgent"
                          ? "urgent"
                          : recruitmentRequest.urgency === "Dans les 7 jours"
                          ? "soon"
                          : "normal"
                      }">
                        ${recruitmentRequest.urgency}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="section">
                <h3>Description des Besoins</h3>
                <p>${recruitmentRequest.needsDescription}</p>
              </div>
              
              <div class="footer">
                <p>&copy; ${new Date().getFullYear()} - Système de Recrutement</p>
                <p>Cette demande a été soumise le ${new Date(
                  recruitmentRequest.createdAt
                ).toLocaleString("fr-FR")}</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Erreur d'envoi d'email:", error);
        reject(error);
      } else {
        console.log("Email envoyé avec succès:", info.response);
        resolve(info);
      }
    });
  });
};

module.exports = sendEmailToAdmin;
