// Import necessary modules
require("dotenv").config(); // Load environment variables
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors"); // Allows cross-origin requests

const app = express();
const port = process.env.PORT || 3000; // Use dynamic port for deployment

app.use(cors({
    origin: "https://profile-eosin-rho.vercel.app", 
    methods: ["POST", "GET"],
    allowedHeaders: ["Content-Type"]
}));

// Middleware to parse JSON-encoded body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files correctly (ensures all assets are accessible)
app.use(express.static(path.join(__dirname, "public")));
app.use("/scripts", express.static(path.join(__dirname, "public", "scripts"))); // Ensure scripts are served

// Default route to serve index.html
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"), (err) => {
        if (err) {
            console.error("Error serving index.html:", err);
            res.status(500).send("Error loading page.");
        }
    });
});

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER, // Secure email from .env
        pass: process.env.EMAIL_PASS, // Secure password from .env
    },
});

// Endpoint to handle form submission
app.post("/submit", async (req, res) => {
    const { name, email, message } = req.body;

    // Validate form data
    if (!name || !email || !message) {
        console.warn("Missing form fields.");
        return res.status(400).json({ error: "All fields are required." });
    }

    console.log("\nForm Submission Received:");
    console.log(`🔹 Name: ${name}`);
    console.log(`🔹 Email: ${email}`);
    console.log(`🔹 Message: ${message}`);

    // Email to you (the website owner)
    const ownerMailOptions = {
        from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_USER,
        subject: `New Contact Form Submission: ${name}`,
        text: `Hi Brian,\n\nYou have a new message from your portfolio website:\n\nName: ${name}\nEmail: ${email}\nMessage: \n${message}\n\nBest regards,\nYour Website`
    };

    // Confirmation email to sender
    const confirmationMailOptions = {
        from: `"Brian DeLorenzo" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Thank You for Reaching Out!",
        text: `Hi ${name},\n\nThank you for connecting with me! I appreciate you reaching out.\n\nI will review your message and do my best to respond within three business days. If you have any urgent matters, please feel free to follow up.\n\nLooking forward to speaking with you soon!\n\nBest regards,\nBrian DeLorenzo\nAspiring Software Developer\nLinkedIn: https://www.linkedin.com/in/brian-delorenzo-ab7304283/`
    };

    try {
        // Send both emails
        await transporter.sendMail(ownerMailOptions);
        await transporter.sendMail(confirmationMailOptions);

        console.log("Emails sent successfully!");
        res.status(200).json({ message: "Form submitted successfully." });
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ error: "An error occurred while sending the email." });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port} or on Render.`);
});