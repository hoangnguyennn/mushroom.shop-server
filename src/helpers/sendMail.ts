import nodemailer from 'nodemailer';

const sendMail = async ({
  email,
  subject,
  html,
}: {
  email: string;
  subject: string;
  html: string;
}) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: '754defc335c6d6',
      pass: '7e3d03d3bdfccd',
    },
  });

  return transporter.sendMail({
    from: 'Mushroom Shop',
    to: email,
    subject,
    html,
  });
};

export default sendMail;
