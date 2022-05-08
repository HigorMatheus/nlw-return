import nodemailer from 'nodemailer';
import { MailAdapter, SendMailData } from "../mail-adapter";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "09d0b3ae631a78",
    pass: "461d3bc766190f",
  },
});

export class NodemailerAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData) {
    await transport.sendMail({
      from: "Equipe Feedget <hello@feedget.com>",
      to: "Paulo de Oliveira <paulotboliveira@gmail.com>",
      subject,
      html: body,
    });
  }
}
