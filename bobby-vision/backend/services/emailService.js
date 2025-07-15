const nodemailer = require('nodemailer');
const { ApiError } = require('../utils/errors'); // Import custom error classes

// Placeholder for email transport configuration
let transporter = null;

if (process.env.EMAIL_HOST && process.env.EMAIL_PORT && process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST, // e.g., smtp.gmail.com
        port: process.env.EMAIL_PORT, // e.g., 587 or 465
        secure: process.env.EMAIL_SECURE === 'true', // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_USER, // your email address
            pass: process.env.EMAIL_PASS // your email password or app-specific password
        }
    });
} else {
    console.warn("Email sending is not configured. Please set EMAIL_SERVICE environment variables.");
}


/**
 * Drafts an email based on job, client, and document details.
 * @param {object} jobDetails - Details of the job.
 * @param {object} clientDetails - Details of the client.
 * @param {object} documentDetails - Details of the document to attach.
 * @returns {object} - Structured email details.
 */
const draftEmail = (jobDetails, clientDetails, documentDetails) => {
    const documentType = documentDetails.document_type === 'proposal' ? 'estimate' : documentDetails.document_type;
    const subject = jobDetails.title || (clientDetails.name ? `${clientDetails.name}'s Job Document` : `Job Document`); // Use job title, client name, or default
    const body = `Hi ${clientDetails.name},\n\nSee attached ${documentType} for your review. Please let me know if you have any questions.\n\nThanks,\nBob\n${process.env.BOB_PHONE_NUMBER || 'Bobby\'s Phone Number Placeholder'}`; // Use environment variable for Bobby's phone number

    const attachments = [];
    if (documentDetails.file_path) {
        attachments.push({
            filename: `${subject}_${documentType}.pdf`, // Example filename
            path: documentDetails.file_path // Path to the generated PDF
        });
    }

    return {
        to: clientDetails.email,
        subject: subject,
        text: body,
        attachments: attachments
    };
};

/**
 * Sends an email using Nodemailer.
 * @param {object} emailDetails - Structured email details.
 * @returns {Promise<object>} - Information about the sent email.
 */
const sendEmail = async (emailDetails) => {
    
    try {
        if (!transporter) {
            console.error("Email transporter is not configured. Cannot send email.");
            // Log email details instead of sending
            throw new ApiError("Email sending is not configured.", 500); // Throw an error if not configured
        }

        // Send the email
        const info = await transporter.sendMail({
            from: process.env.EMAIL_USER, // Sender address (needs configuration)
            to: emailDetails.to,
            subject: emailDetails.subject,
            text: emailDetails.text,
            attachments: emailDetails.attachments
        });
        console.log('Email sent: %s', info.messageId);
        return info;

    } catch (error) {
        console.error("Error sending email:", error);
 throw new ApiError(`Failed to send email: ${error.message}`, 500); // Throw a custom error for sending failures
    }
};

module.exports = {
    draftEmail,
    sendEmail
};