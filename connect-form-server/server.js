// Import necessary modules
require("dotenv").config(); // Load environment variables
const express = require("express");
const path = require("path"); // Ensure correct file paths
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();
const port = process.env.PORT || 3000; // Use dynamic port for Render

// Middleware to parse JSON-encoded body
app.use(bodyParser.json());

// Serve static files from the correct 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// Default route to serve index.html
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"), (err) => {
        if (err) {
            console.error("Error serving index.html:", err);
            res.status(500).send("Error loading page.");
        }
    });
});

// Nodemailer transporter setup using environment variables
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER, // Secure email from .env
        pass: process.env.EMAIL_PASS, // Secure password from .env
    },
});

// Endpoint to handle form submission
app.post("/submit", async (req, res) => {
    const { name, email, message } = req.body;

    console.log("Form Submission Received:");
    console.log(`Name: ${name}`);
    console.log(`Email: ${email}`);
    console.log(`Message: ${message}`);

    // Email to you (the website owner)
    const ownerMailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: `New Contact Form Submission: ${name}`,
        text: `
Hi Brian,

You have a new message from your personal website:

Name: ${name}
Email: ${email}
Message: 
${message}

Best regards,
Your Website
        `,
    };

    // Confirmation email to sender
    const confirmationMailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Thank You for Reaching Out!",
        text: `
Hi ${name},

Thank you for connecting with me! I appreciate you reaching out.

I will review your message and do my best to respond within three business days. If you have any urgent matters, please feel free to follow up.

Looking forward to speaking with you soon!

Best regards,  
Brian DeLorenzo  
Aspiring Software Developer  
LinkedIn: https://www.linkedin.com/in/brian-delorenzo-ab7304283/  
        `,
    };

    try {
        // Send both emails
        await transporter.sendMail(ownerMailOptions);
        await transporter.sendMail(confirmationMailOptions);

        console.log("Emails sent successfully!");
        res.status(200).send("Form submitted successfully.");
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).send("An error occurred.");
    }
});