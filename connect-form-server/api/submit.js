import nodemailer from "nodemailer";

export default async function handler(req, res) {
    try {
        // Allow CORS
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type");

        if (req.method === "OPTIONS") {
            return res.status(200).end(); // Preflight response
        }

        if (req.method !== "POST") {
            return res.status(405).json({ error: "Method Not Allowed" });
        }

        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ error: "All fields are required." });
        }

        console.log("Form Submission Received:");
        console.log(`Name: ${name}`);
        console.log(`Email: ${email}`);
        console.log(`Message: ${message}`);

        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
            console.error("Missing email configuration.");
            return res.status(500).json({ error: "Email configuration error." });
        }

        // Setup Nodemailer transporter
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        // Email to You (Owner)
        const ownerMailOptions = {
            from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER,
            subject: `New Contact Form Submission: ${name}`,
            text: `Hi Brian,\n\nYou have a new message from your portfolio website:\n\n`
                + `Name: ${name}\n`
                + `Email: ${email}\n`
                + `Message:\n${message}\n\n`
                + `Best regards,\nYour Website`,
        };

        // Confirmation Email to Sender
        const confirmationMailOptions = {
            from: `"Brian DeLorenzo" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Thank You for Reaching Out!",
            text: `Hi ${name},\n\n`
                + `Thank you for connecting with me! I appreciate you reaching out.\n\n`
                + `I will review your message and do my best to respond within three business days. If you have any urgent matters, please feel free to follow up.\n\n`
                + `Looking forward to speaking with you soon!\n\n`
                + `Best regards,\nBrian DeLorenzo\nAspiring Software Developer\n`
                + `LinkedIn: https://www.linkedin.com/in/brian-delorenzo-ab7304283/`,
        };

        // Send both emails
        await transporter.sendMail(ownerMailOptions);
        await transporter.sendMail(confirmationMailOptions);

        console.log("Emails sent successfully!");
        res.status(200).json({ message: "Form submitted successfully." });

    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ error: "An error occurred while sending the email." });
    }
}