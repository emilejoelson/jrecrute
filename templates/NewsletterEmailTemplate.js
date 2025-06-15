const fs = require('fs').promises;
const path = require('path');

/**
 * Newsletter Email Template Class
 * 
 * Handles the rendering of newsletter email templates with dynamic content
 */
class NewsletterEmailTemplate {
  /**
   * Get the CSS styles for the email template
   * 
   * @returns {Promise<String>} - The CSS styles as a string
   */
  static async getStyles() {
    try {
      const cssPath = path.join(__dirname, 'styles', 'newsletter.css');
      return await fs.readFile(cssPath, 'utf8');
    } catch (error) {
      console.warn(`Could not load CSS file: ${error.message}`);
      // Fallback to embedded styles
      return this.getEmbeddedStyles();
    }
  }

  /**
   * Get embedded CSS styles as fallback
   * 
   * @returns {String} - Embedded CSS styles
   */
  static getEmbeddedStyles() {
    return `
      body {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        background-color: #f4f7fc;
        margin: 0;
        padding: 0;
        line-height: 1.6;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
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

      .logo {
        margin-bottom: 15px;
      }

      .header h1 {
        color: #2c3e50;
        font-size: 28px;
        margin: 0;
        padding: 0;
        font-weight: 700;
        letter-spacing: -0.5px;
      }
      
      .newsletter-image {
        width: 100%;
        max-height: 300px;
        object-fit: cover;
        border-radius: 8px;
        margin: 20px 0;
        display: block;
      }

      .content {
        color: #34495e;
        font-size: 16px;
        line-height: 1.8;
        margin-bottom: 30px;
        padding: 0 10px;
      }

      .content h2 {
        color: #2c3e50;
        font-size: 22px;
        margin-top: 25px;
        margin-bottom: 15px;
      }

      .content p {
        margin-bottom: 20px;
      }

      .content a {
        color: #3498db;
        text-decoration: none;
        border-bottom: 1px solid transparent;
        transition: border-color 0.3s ease;
      }

      .content a:hover {
        border-bottom-color: #3498db;
      }

      .button {
        display: block;
        width: 200px;
        background-color: #3498db;
        color: #ffffff !important;
        text-align: center;
        padding: 14px 0;
        margin: 30px auto;
        border-radius: 6px;
        text-decoration: none;
        font-weight: 600;
        transition: background-color 0.3s ease;
      }

      .button:hover {
        background-color: #2980b9;
      }

      .footer {
        text-align: center;
        margin-top: 30px;
        padding-top: 20px;
        border-top: 1px solid #eee;
        color: #7f8c8d;
        font-size: 14px;
      }
      
      .social-links {
        margin: 15px 0;
      }
      
      .social-links a {
        display: inline-block;
        margin: 0 10px;
        color: #7f8c8d;
        text-decoration: none;
      }
      
      .unsubscribe {
        color: #95a5a6;
        font-size: 12px;
        text-align: center;
        margin-top: 15px;
      }
      
      .unsubscribe a {
        color: #7f8c8d;
        text-decoration: underline;
      }
      
      .description {
        font-size: 18px;
        font-weight: 300;
        font-style: italic;
        color: #7f8c8d;
        text-align: center;
        margin: 20px 0;
        padding: 0 15px;
      }
      
      /* Responsive adjustments */
      @media only screen and (max-width: 480px) {
        .email-container {
          padding: 20px 15px;
        }
        
        .header h1 {
          font-size: 24px;
        }
        
        .description {
          font-size: 16px;
        }
      }
    `;
  }

  /**
   * Render the email template with provided data
   * 
   * @param {Object} data - Template data including title, content, etc.
   * @returns {String} - Rendered HTML template
   */
  static async render(data) {
    const styles = await this.getStyles();
    
    // Create the image HTML section based on availability
    const imageSection = data.imageUrl ? 
      `<img src="${data.imageUrl}" class="newsletter-image" alt="${data.title}" style="width: 100%; max-height: 300px; object-fit: cover; border-radius: 8px; margin: 20px 0; display: block;">` :
      '';
      
    return `
      <!DOCTYPE html>
      <html lang="fr">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <title>${data.title}</title>
          <style>
            ${styles}
          </style>
        </head>
        <body>
          <div class="main-container">
            <div class="email-container">
              <div class="header">
                <div class="logo">
                  <!-- Logo can be added here -->
                </div>
                <h1>${data.title}</h1>
              </div>
              
              ${data.description ? `<div class="description">${data.description}</div>` : ''}
              
              ${imageSection}
  
              <div class="content">
                ${data.content}
              </div>
            </div>
  
            <div class="footer">
              <div class="social-links">
                <a href="#" target="_blank">LinkedIn</a>
                <a href="#" target="_blank">Twitter</a>
                <a href="#" target="_blank">Facebook</a>
              </div>
            
              <p>&copy; ${data.currentYear} - Consult Collab</p>
              <p class="unsubscribe">
                Vous ne souhaitez plus recevoir notre newsletter ? 
                <a href="${data.unsubscribeUrl}">Se désabonner</a>
              </p>
            </div>
          </div>
        </body>
      </html>
    `;
  }
  
  /**
   * Render the email template with provided data (synchronous version)
   * 
   * @param {Object} data - Template data including title, content, etc.
   * @returns {String} - Rendered HTML template
   */
  static render(data) {
    const styles = this.getEmbeddedStyles();
    
    // Create the image HTML section based on availability
    const imageSection = data.imageUrl ? 
      `<img src="${data.imageUrl}" class="newsletter-image" alt="${data.title}" style="width: 100%; max-height: 300px; object-fit: cover; border-radius: 8px; margin: 20px 0; display: block;">` :
      '';
      
    return `
      <!DOCTYPE html>
      <html lang="fr">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <title>${data.title}</title>
          <style>
            ${styles}
          </style>
        </head>
        <body>
          <div class="main-container">
            <div class="email-container">
              <div class="header">
                <div class="logo">
                  <!-- Logo can be added here -->
                </div>
                <h1>${data.title}</h1>
              </div>
              
              ${data.description ? `<div class="description">${data.description}</div>` : ''}
              
              ${imageSection}
  
              <div class="content">
                ${data.content}
              </div>
            </div>
  
            <div class="footer">
              <div class="social-links">
                <a href="#" target="_blank">LinkedIn</a>
                <a href="#" target="_blank">Twitter</a>
                <a href="#" target="_blank">Facebook</a>
              </div>
            
              <p>&copy; ${data.currentYear} - Consult Collab</p>
              <p class="unsubscribe">
                Vous ne souhaitez plus recevoir notre newsletter ? 
                <a href="${data.unsubscribeUrl}">Se désabonner</a>
              </p>
            </div>
          </div>
        </body>
      </html>
    `;
  }
}

module.exports = NewsletterEmailTemplate;