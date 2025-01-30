import nodemailer from "nodemailer";
import cors from "cors";

// Vercel handler function
export default async function handler(req, res) {
    // Set up CORS
    const corsOptions = {
        origin: "https://profile-eosin-rho.vercel.app",
        methods: ["POST"],
        allowedHeaders: ["Content-Type"],
    };

    // Apply CORS
    cors(corsOptions)(req, res, async () => {
        // Only allow POST requests
        if (req.method !== "POST") {
            return res.status(405).json({ error: "Method Not Allowed" });
        }

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

        // Set up Nodemailer transporter
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        // Email to you (the website owner)
        const ownerMailOptions = {
            from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER,
            subject: `New Contact Form Submission: ${name}`,
            text: `Hi Brian,\n\nYou have a new message from your portfolio website:\n\nName: ${name}\nEmail: ${email}\nMessage:\n${message}\n\nBest regards,\nYour Website`,
        };

        // Confirmation email to the sender
        const confirmationMailOptions = {
            from: `"Brian DeLorenzo" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Thank You for Reaching Out!",
            text: `Hi ${name},\n\nThank you for connecting with me! I appreciate you reaching out.\n\nI will review your message and do my best to respond within three business days. If you have any urgent matters, please feel free to follow up.\n\nLooking forward to speaking with you soon!\n\nBest regards,\nBrian DeLorenzo\nAspiring Software Developer\nLinkedIn: https://www.linkedin.com/in/brian-delorenzo-ab7304283/`,
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
}