import nodemailer from "nodemailer";

// API route handler for form submissions
export default async function handler(req, res) {
    // Enable CORS
    res.setHeader("Access-Control-Allow-Origin", "https://profile-eosin-rho.vercel.app");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    // Handle preflight requests (CORS)
    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }

    // Only allow POST requests
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    // Extract form data
    const { name, email, message } = req.body;

    // Validate form data
    if (!name || !email || !message) {
        console.warn("Missing form fields.");
        return res.status(400).json({ error: "All fields are required." });
    }

    console.log("Form Submission Received:");
    console.log(`Name: ${name}`);
    console.log(`Email: ${email}`);
    console.log(`Message: ${message}`);

    // Configure Nodemailer transporter
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    // Email to site owner
    const ownerMailOptions = {
        from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_USER,
        subject: `New Contact Form Submission from ${name}`,
        text: `You have received a new message from your portfolio website.

        Name: ${name}
        Email: ${email}
        Message:
        ${message}

        Best regards,
        Your Website`,
    };

    // Confirmation email to sender
    const confirmationMailOptions = {
        from: `"Brian DeLorenzo" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Thank You for Reaching Out",
        text: `Hi ${name},

        Thank you for reaching out! I have received your message and will do my best to respond within three business days. If you have an urgent matter, please feel free to follow up.

        Looking forward to speaking with you soon.

        Best regards,
        Brian DeLorenzo
        Aspiring Software Developer
        LinkedIn: https://www.linkedin.com/in/brian-delorenzo-ab7304283/`,
    };

    try {
        // Send emails
        await transporter.sendMail(ownerMailOptions);
        await transporter.sendMail(confirmationMailOptions);

        console.log("Emails sent successfully.");
        return res.status(200).json({ message: "Form submitted successfully." });
    } catch (error) {
        console.error("Error sending email:", error);
        return res.status(500).json({ error: "Failed to send email. Please try again later." });
    }
}