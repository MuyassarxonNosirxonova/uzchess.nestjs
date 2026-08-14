import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);
  private readonly transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT),
      secure: false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
  }

  async sendOtp(to: string, code: string): Promise<void> {
    try {
      await this.transporter.sendMail({
        from: process.env.MAIL_FROM,
        to,
        subject: 'UzChess — tasdiqlash kodi',
        html: `
          <div style="font-family: sans-serif; padding: 24px;">
            <h2>UzChess</h2>
            <p>Ro'yxatdan o'tishni yakunlash uchun tasdiqlash kodi:</p>
            <p style="font-size: 28px; font-weight: bold; letter-spacing: 4px;">${code}</p>
            <p style="color: #888; font-size: 13px;">Agar bu so'rovni siz yubormagan bo'lsangiz, xabarni e'tiborsiz qoldiring.</p>
          </div>
        `,
      });
    } catch (error) {
      this.logger.error(`OTP email yuborilmadi (${to}): ${error}`);
    }
  }
}