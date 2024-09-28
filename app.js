const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000; // Server port for Node.js/Express

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: false }));

// Serve static files like CSS and Images from 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Serve HTML files from 'Pages' folder
app.get('/', (req, res) => { // This serves Index.html at the root URL
    res.sendFile(path.join(__dirname, 'Pages', 'Index.html'));
});

app.get('/Pages/Index.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'Pages', 'Index.html'));
});

app.get('/Pages/About%20Me.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'Pages', 'About Me.html'));
});

app.get('/Pages/Projects.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'Pages', 'Projects.html'));
});

app.get('/Pages/Contact.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'Pages', 'Contact.html'));
});

// Handle form submissions for contact
app.post('/contact', (req, res) => {
    const { name, email, message } = req.body;

    // Nodemailer configuration
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'your-email@gmail.com', // Replace with your email
            pass: 'your-email-password'   // Replace with your email password (or app password)
        }
    });

    const mailOptions = {
        from: email,
        to: 'your-email@gmail.com', // Replace with your email
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
  