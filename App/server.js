const express = require('express');
const nodemailer = require('nodemailer');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(express.static(path.join(__dirname, 'public')));

app.post('/send-email', upload.array('attachments'), (req, res) => {
    const { email, subject, message } = req.body;

    // Create a transporter
    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'your-email@gmail.com', // Your email
            pass: 'your-email-password' // Your email password
        }
    });

    let mailOptions = {
        from: email,
        to: 'raiwaqasabid@gmail.com',
        subject: subject,
        text: message,
        attachments: req.files.map(file => ({
            filename: file.originalname,
            path: file.path
        }))
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());
        }

        // Delete uploaded files after sending the email
        req.files.forEach(file => fs.unlinkSync(file.path));

        res.status(200).send('Email sent: ' + info.response);
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
