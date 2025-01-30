import nodemailer from "nodemailer";

export default async function handler(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "https://profile-nd4pz0cxg-brian-delorenzos-projects.vercel.app");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }

    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        console.warn("Missing form fields.");
        return res.status(400).json({ error: "All fields are required." });
    }

    console.log("Form Submission Received:");
    console.log(`Name: ${name}`);
    console.log(`Email: ${email}`);
    console.log(`Message: ${message}`);

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const ownerMailOptions = {
        from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_USER,
        subject: `New Contact Form Submission from ${name}`,
        text: `You have received a new message from your portfolio website.\n\nName: ${name}\nEmail: ${email}\nMessage:\n${message}\n\nBest regards,\nYour Website`,
    };

    const confirmationMailOptions = {
        from: `"Brian DeLorenzo" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Thank You for Reaching Out",
        text: `Hi ${name},\n\nThank you for reaching out! I have received your message and will do my best to respond within three business days. If you have an urgent matter, please feel free to follow up.\n\nLooking forward to speaking with you soon.\n\nBest regards,\nBrian DeLorenzo`,
    };

    try {
        await transporter.sendMail(ownerMailOptions);
        await transporter.sendMail(confirmationMailOptions);
        console.log("Emails sent successfully.");
        return res.status(200).json({ message: "Form submitted successfully." });
    } catch (error) {
        console.error("Error sending email:", error);
        return res.status(500).json({ error: "Failed to send email. Please try again later." });
    }
}