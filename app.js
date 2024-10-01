const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config(); // Load environment variables from .env file

const app = express();
const port = 3000;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: false }));

// Serve static files like CSS and Images from 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Serve HTML files from the root folder
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Index.html'));
});

app.get('/Index.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'Index.html'));
});

app.get('/About Me.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'About Me.html'));
});

app.get('/Projects.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'Projects.html'));
});

app.get('/Contact.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'Contact.html'));
});

// Handle form submissions for contact
app.post('/contact', (req, res) => {
    const { name, email, message } = req.body;

    // Nodemailer configuration
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER, // Use the environment variable
            pass: process.env.EMAIL_PASS  // Use the environment variable
        }
    });

    const mailOptions = {
        from: email, // This could be set to your email if you want to show the sender
        to: process.env.EMAIL_USER, // Your email
        subject: `Contact Form Submission from ${name}`,
        text: `You have received a new message from ${name} (${email}): \n\n${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).send('Failed to send message. Please try again later.');
        }
        res.send('Message sent successfully!');
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
