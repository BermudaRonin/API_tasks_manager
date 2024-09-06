import OperationFailure from '../../../utils/espress/operation.js';
import config from '../version.config.js';
import nodemailer from 'nodemailer';

export const mailer = nodemailer.createTransport(config.mailer);


export class Mail {
    static sender = "bermudaronin@gmail.com";

    static url = {
        emailVerification: "#",
        passwordReset: "#", // ${process.env.FRONTEND_URL}/reset-password/${token}
    }
    static subject = {
        emailVerification: "Email Verification",
        passwordReset: "Password Reset",
    }
    static html = {
        emailVerification: (user, pin) => `
            <html>
                <head>
                    <title>Email Verification</title>
                </head>
                <body>
                    <h2>Email Verification</h2>
                    <p>Dear ${user.username},</p>
                    <p>We're excited to have you on board! To complete your email verification, please enter the following PIN:</p>
                    <h3>${pin}</h3>
                    <p>Click on the following link to verify your email address:</p>
                    <a href="${this.url.emailVerification}">Verify Email</a>
                    <p>If you didn't request this verification, please ignore this email.</p>
                    <p>Best regards,</p>
                    <p>The Todos Team</p>
                </body>
            </html>
        `,
        passwordReset: (user) => `
            <html>
                <head>
                    <title>Password Reset</title>
                </head>
                <body>
                    <h2>Password Reset</h2>
                    <p>Dear ${user.name},</p>
                    <p>We've received a request to reset your password. To complete the process, please click on the following link:</p>
                    <a href="${this.url.passwordReset}">Reset Password</a>
                    <p>If you didn't request this reset, please ignore this email.</p>
                    <p>Best regards,</p>
                    <p>The Todos Team</p>
                </body>
            </html>
        `
    }
    static sendMail = async (options = {}) => {
        try {
            await mailer.sendMail({ from: this.sender, ...options });
        } catch (caught) {
            console.log("CAUGHT ON EMAIL SENDING {sendMail}");
            console.log(caught);
            OperationFailure.autoCatch(caught);
        }
    }

    static emailVerification = async (user, pin) => await this.sendMail({
        to: user.email,
        subject: this.subject.emailVerification,
        html: this.html.emailVerification(user, pin),
    })

    static passwordReset = async (user) => await this.sendMail({
        to: user.email,
        subject: this.subject.emailVerification,
        html: this.html.passwordReset(user),
    })

}
