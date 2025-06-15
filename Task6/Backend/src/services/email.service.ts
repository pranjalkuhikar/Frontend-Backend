import nodemailer from "nodemailer";
import { logger } from "../utils/logger.js";
import config from "../config/config.js";

class EmailService {
  private static instance: EmailService;
  private transporter: nodemailer.Transporter;

  private constructor() {
    this.transporter = nodemailer.createTransport({
      host: config.SMTP_HOST,
      port: config.SMTP_PORT,
      secure: config.SMTP_SECURE,
      auth: {
        user: config.SMTP_USER,
        pass: config.SMTP_PASS,
      },
    });
  }

  public static getInstance(): EmailService {
    if (!EmailService.instance) {
      EmailService.instance = new EmailService();
    }
    return EmailService.instance;
  }

  public async sendEmail(to: string, subject: string, html: string) {
    try {
      const mailOptions = {
        from: config.SMTP_FROM,
        to,
        subject,
        html,
      };

      const info = await this.transporter.sendMail(mailOptions);
      logger.info('Email sent successfully:', info.messageId);
      return info;
    } catch (error) {
      logger.error('Error sending email:', error);
      throw error;
    }
  }

  public async sendVerificationEmail(to: string, token: string) {
    const verificationUrl = `${config.FRONTEND_URL}/verify-email?token=${token}`;
    const html = `
      <h1>Email Verification</h1>
      <p>Please click the link below to verify your email address:</p>
      <a href="${verificationUrl}">Verify Email</a>
    `;
    return this.sendEmail(to, 'Verify Your Email', html);
  }

  public async sendPasswordResetEmail(to: string, token: string) {
    const resetUrl = `${config.FRONTEND_URL}/reset-password?token=${token}`;
    const html = `
      <h1>Password Reset</h1>
      <p>Please click the link below to reset your password:</p>
      <a href="${resetUrl}">Reset Password</a>
    `;
    return this.sendEmail(to, 'Reset Your Password', html);
  }
}

export const emailService = EmailService.getInstance();
