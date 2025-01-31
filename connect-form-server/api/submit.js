import nodemailer from "nodemailer";

export default async function handler(req, res) {
    try {
        // CORS Headers
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type");

        if (req.method === "OPTIONS") {
            return res.status(204).end();
        }

        if (req.method !== "POST") {
            return res.status(405).json({ error: "Method Not Allowed" });
        }

        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ error: "All fields are required." });
        }

        console.log("Received Contact Form Submission:", { name, email, message });

        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
            console.error("Missing email environment variables.");
            return res.status(500).json({ error: "Email configuration error." });
        }

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const ownerMailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject: `New Contact: ${name}`,
            text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
        };

        const confirmationMailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Thank You for Reaching Out!",
            text: `Hi ${name},\n\nThanks for reaching out. I'll get back to you soon.\n\nBest,\nBrian`,
        };

        await transporter.sendMail(ownerMailOptions);
        await transporter.sendMail(confirmationMailOptions);

        console.log("Emails sent successfully");
        return res.status(200).json({ message: "Success" });
    } catch (error) {
        console.error("Error sending email:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}