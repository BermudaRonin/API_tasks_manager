import nodemailer from 'nodemailer';
import { Issue } from '../utils/index.js';

const config = {
    service: {
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: process.env.MAILTRAP_USER,
            pass: process.env.MAILTRAP_PASSWORD
        }
    },
    defaultSender: "bermudaronin@gmail.com"
}

const frontendlink = "/frontend";

const templates = {
    email: (user, token) => `
        <html>
            <head>
                <title>Email Verification</title>
            </head>
            <body>
                <h2>Email Verification</h2>
                <p>Dear ${user.username},</p>
                <p>We've received a request to verify your email. To complete the process, please click on the following link:</p>
                <a href="${frontendlink}/verify-email?token=${token}" class="button">Verify Email</a>
                <i>The link will expire in 30 minutes</i>
            </body>
        </html>
    `,
    reset: (user, token) => `
        <html>
            <head>
                <title>Password Reset</title>
            </head>
            <body>
                <h2>Password Reset Verification</h2>
                <p>Dear ${user.username},</p>
                <p>We've received a request to reset your password. To complete the process, please click on the following link:</p>
                <a href="${frontendlink}/verify-password?token=${token}" class="button">Reset Password</a>
                <i>The link will expire in 30 minutes</i>
            </body>
        </html>
    `
}


export default class Mail {
    static service = nodemailer.createTransport(config.service);

    static async send(options = {}) {
        try {
            const from = config.defaultSender;
            await this.service.sendMail({ from, ...options });
        } catch (error) {
            throw new Issue.EmailNotSend();
        }
    }

    static sendEmailToken = (user, emailToken) => this.send({
        to: user.email,
        subject: "Email verification",
        html: templates.email(user, emailToken),
    })

    static sendResetToken = (user, resetToken) => this.send({
        to: user.email,
        subject: "Password reset",
        html: templates.reset(user, resetToken),
    })

}
