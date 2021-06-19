const nodemailer = require("nodemailer");

const email = process.env.SENDER_EMAIL
const password = process.env.SENDER_PASSWORD

const transporter = nodemailer.createTransport({
    service: 'Yandex',
    auth: {
        user: email,
        pass: password
    }
});

async function sendWelcomeEmail(to, name) {
    try {
        const info = await transporter.sendMail({
            from: email,
            to,
            subject: 'Welcome to Task Manager',
            text: `Thanks for joining in, ${name}. Let me know if you have any suggestions or kind words`,
        });
        if (!info.accepted.includes(to)) {
            console.log('Email sending was unsuccessful', info)
        }
    } catch (e) {
        console.log('Something went wrong in sending email notification', e)
    }
}

async function sendCancellationEmail(to, name) {
    try {
        const info = await transporter.sendMail({
            from: email,
            to,
            subject: 'Sad to see you leave',
            text: `Goodbye! We are sad to see you leave so soon, ${name}. Let me know if you had problems. Goodluck!`,
        });
        if (!info.accepted.includes(to)) {
            console.log('Email sending was unsuccessful', info)
        }
    } catch (e) {
        console.log('Something went wrong in sending email notification', e)
    }
}

module.exports = {
    sendWelcomeEmail,
    sendCancellationEmail,
}
