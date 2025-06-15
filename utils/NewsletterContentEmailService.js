const nodemailer = require("nodemailer");
const path = require('path');
const fs = require('fs').promises;
const EmailTemplate = require('../templates/NewsletterEmailTemplate');

/**
 * Configure nodemailer transporter
 */
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

/**
 * Helper function to ensure image URLs are correctly formatted
 * 
 * @param {String} imagePath - The image path from the newsletter object
 * @returns {String} - The fully qualified image URL
 */
const getFullImageUrl = (imagePath) => {
  const baseUrl = process.env.BASE_URL;
  
  // If path is empty, return empty string
  if (!imagePath) return '';
  
  // If the image path already starts with http(s), it's already a full URL
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  
  // Remove any leading slashes from the image path
  const cleanImagePath = imagePath.replace(/^\/+/, '');
  
  // If the image path already includes 'uploads/images', don't add it again
  if (cleanImagePath.includes('uploads/images')) {
    return `${baseUrl}/${cleanImagePath}`;
  }
  
  // Otherwise, construct the full path with the uploads/images directory
  return `${baseUrl}/uploads/images/${cleanImagePath}`;
};

/**
 * Process newsletter image for email
 * 
 * @param {String} image - Image path from newsletter
 * @returns {Object} - Object containing imageUrl and attachment if applicable
 */
const processNewsletterImage = async (image) => {
  let result = {
    imageUrl: '',
    attachment: null
  };
  
  if (!image) return result;
  
  try {
    // If it's already a full URL, we'll need to use it directly
    if (image.startsWith('http')) {
      result.imageUrl = image;
      return result;
    }
    
    // For local images, resolve the path
    const imageName = path.basename(image);
    const imagePath = path.join(process.cwd(), 'uploads', 'images', imageName);
    
    // Check if file exists
    await fs.access(imagePath);
    
    // Generate a unique content ID for this image
    const contentId = `newsletter-image-${Date.now()}@consultcollab.com`;
    
    // Add as an inline attachment
    result.attachment = {
      filename: imageName,
      path: imagePath,
      cid: contentId,
      contentDisposition: 'inline'
    };
    
    // Set the image URL to use the content ID
    result.imageUrl = `cid:${contentId}`;
    
    console.log(`Image will be embedded with content ID: ${contentId}`);
  } catch (error) {
    console.warn(`Image attachment failed: ${error.message}`);
    // Use absolute URL as fallback
    result.imageUrl = getFullImageUrl(image);
  }
  
  return result;
};

/**
 * Send newsletter email to a single subscriber
 * 
 * @param {Object} subscriber - The subscriber object containing email and other details
 * @param {Object} newsletter - The newsletter object with content and metadata
 * @returns {Promise} - Promise that resolves when email is sent
 */
const sendNewsletterEmail = async (subscriber, newsletter) => {
  // Get current year for copyright in footer
  const currentYear = new Date().getFullYear();
  
  // Ensure BASE_URL is correctly set in the environment
  if (!process.env.BASE_URL) {
    console.warn("BASE_URL is not set in environment variables. Image URLs may be incorrect.");
  }
  
  // Process newsletter image
  const { imageUrl, attachment } = await processNewsletterImage(newsletter.image);
  
  // Prepare attachments array
  const mailAttachments = attachment ? [attachment] : [];

  // Generate plain text version
  const plainTextContent = `${newsletter.title}
    
${newsletter.description}

${newsletter.content.replace(/<[^>]*>?/gm, '')}

© ${currentYear} - Consult Collab

Vous ne souhaitez plus recevoir notre newsletter ? Visitez: ${process.env.FRONTEND_URL}/unsubscribe?email=${encodeURIComponent(subscriber.email)}`;

  // Generate HTML content using template
  const htmlContent = EmailTemplate.render({
    title: newsletter.title,
    description: newsletter.description,
    content: newsletter.content,
    imageUrl: imageUrl,
    currentYear: currentYear,
    unsubscribeUrl: `${process.env.FRONTEND_URL}/unsubscribe?email=${encodeURIComponent(subscriber.email)}`
  });

  const mailOptions = {
    from: {
      name: "Consult Collab",
      address: process.env.EMAIL_USER
    },
    to: subscriber.email,
    subject: newsletter.title,
    attachments: mailAttachments,
    html: htmlContent,
    text: plainTextContent
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending newsletter email:", error);
        reject(error);
      } else {
        console.log("Newsletter email sent successfully:", info.response);
        resolve(info);
      }
    });
  });
};

/**
 * Batch send newsletter to all subscribers
 * 
 * @param {Array} subscribers - Array of subscriber objects
 * @param {Object} newsletter - The newsletter object
 * @returns {Object} - Results object with statistics
 */
const batchSendNewsletter = async (subscribers, newsletter) => {
  const results = {
    total: subscribers.length,
    sent: 0,
    failed: 0,
    errors: []
  };

  // Log the start of the batch send
  console.log(`Starting batch send of newsletter "${newsletter.title}" to ${subscribers.length} subscribers...`);

  // First check if the image exists
  if (newsletter.image) {
    try {
      const imageName = path.basename(newsletter.image);
      const imagePath = path.join(process.cwd(), 'uploads', 'images', imageName);
      await fs.access(imagePath);
      console.log(`✓ Newsletter image verified at: ${imagePath}`);
    } catch (error) {
      console.warn(`⚠️ Warning: Newsletter image not found at expected path. Error: ${error.message}`);
    }
  }

  // First send a test email to yourself
  if (process.env.EMAIL_USER) {
    try {
      console.log(`Sending test email to ${process.env.EMAIL_USER}...`);
      const testSubscriber = { email: process.env.EMAIL_USER };
      await sendNewsletterEmail(testSubscriber, newsletter);
      console.log(`✓ Test email sent successfully to ${process.env.EMAIL_USER}`);
    } catch (error) {
      console.error(`❌ Test email failed: ${error.message}`);
    }
  }

  for (const subscriber of subscribers) {
    try {
      await sendNewsletterEmail(subscriber, newsletter);
      results.sent++;
      
      // Log progress every 10 emails
      if (results.sent % 10 === 0) {
        console.log(`Progress: ${results.sent}/${results.total} emails sent`);
      }
    } catch (error) {
      results.failed++;
      results.errors.push({
        email: subscriber.email,
        error: error.message
      });
      
      console.error(`Failed to send to ${subscriber.email}: ${error.message}`);
    }
  }

  // Log completion
  console.log(`Batch send complete. Results: ${results.sent} sent, ${results.failed} failed`);

  return results;
};

/**
 * Send newsletter email to a single user
 * 
 * @param {Object} user - The user object containing personalInfo with email and name
 * @param {Object} newsletter - The newsletter object with content and metadata
 * @returns {Promise} - Promise that resolves when email is sent
 */
const sendNewsletterEmailToUser = async (user, newsletter) => {
  // Get current year for copyright in footer
  const currentYear = new Date().getFullYear();
  
  // Ensure BASE_URL is correctly set in the environment
  if (!process.env.BASE_URL) {
    console.warn("BASE_URL is not set in environment variables. Image URLs may be incorrect.");
  }
  
  // Process newsletter image
  const { imageUrl, attachment } = await processNewsletterImage(newsletter.image);
  
  // Prepare attachments array
  const mailAttachments = attachment ? [attachment] : [];

  // Generate plain text content
  const plainTextContent = `${newsletter.title}
    
${newsletter.description}

${newsletter.content.replace(/<[^>]*>?/gm, '')}

© ${currentYear} - Consult Collab

Vous ne souhaitez plus recevoir nos communications ? Contactez-nous.`;

  // Generate HTML content using template (without unsubscribe link for users)
  const htmlContent = EmailTemplate.render({
    title: newsletter.title,
    description: newsletter.description,
    content: newsletter.content,
    imageUrl: imageUrl,
    currentYear: currentYear,
    unsubscribeUrl: null // No unsubscribe for users
  });

  const mailOptions = {
    from: {
      name: "Consult Collab",
      address: process.env.EMAIL_USER
    },
    to: user.personalInfo.email,
    subject: newsletter.title,
    attachments: mailAttachments,
    html: htmlContent,
    text: plainTextContent
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending newsletter email to user:", error);
        reject(error);
      } else {
        console.log("Newsletter email sent successfully to user:", info.response);
        resolve(info);
      }
    });
  });
};

/**
 * Batch send newsletter to all users with CV
 * 
 * @param {Array} users - Array of user objects
 * @param {Object} newsletter - The newsletter object
 * @returns {Object} - Results object with statistics
 */
const batchSendNewsletterToUsers = async (users, newsletter) => {
  const results = {
    total: users.length,
    sent: 0,
    failed: 0,
    errors: []
  };

  // Log the start of the batch send
  console.log(`Starting batch send of newsletter "${newsletter.title}" to ${users.length} users with CV...`);

  // First check if the image exists
  if (newsletter.image) {
    try {
      const imageName = path.basename(newsletter.image);
      const imagePath = path.join(process.cwd(), 'uploads', 'images', imageName);
      await fs.access(imagePath);
      console.log(`✓ Newsletter image verified at: ${imagePath}`);
    } catch (error) {
      console.warn(`⚠️ Warning: Newsletter image not found at expected path. Error: ${error.message}`);
    }
  }

  // Send test email to yourself first
  if (process.env.EMAIL_USER) {
    try {
      console.log(`Sending test email to ${process.env.EMAIL_USER}...`);
      const testUser = { 
        personalInfo: { 
          email: process.env.EMAIL_USER,
          firstName: "Test",
          lastName: "User"
        } 
      };
      await sendNewsletterEmailToUser(testUser, newsletter);
      console.log(`✓ Test email sent successfully to ${process.env.EMAIL_USER}`);
    } catch (error) {
      console.error(`❌ Test email failed: ${error.message}`);
    }
  }

  for (const user of users) {
    try {
      await sendNewsletterEmailToUser(user, newsletter);
      results.sent++;
      
      // Log progress every 10 emails
      if (results.sent % 10 === 0) {
        console.log(`Progress: ${results.sent}/${results.total} emails sent to users`);
      }
    } catch (error) {
      results.failed++;
      results.errors.push({
        email: user.personalInfo.email,
        error: error.message
      });
      
      console.error(`Failed to send to user ${user.personalInfo.email}: ${error.message}`);
    }
  }

  // Log completion
  console.log(`Batch send to users complete. Results: ${results.sent} sent, ${results.failed} failed`);

  return results;
};

module.exports = {
  sendNewsletterEmail,
  batchSendNewsletter,
  sendNewsletterEmailToUser,
  batchSendNewsletterToUsers
};