import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 20000,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendConfirmationEmail = async (email) => {
  await transporter.sendMail({
    from: `"Chiomzy Arts" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Thanks for subscribing!",
    html: `<p>Thank you for subscribing to our newsletter!</p>`,
  });
};

export const sendNewsletter = async (subscribers, content) => {
  for (const sub of subscribers) {
    await transporter.sendMail({
      from: `"Chiomzy Arts" <${process.env.EMAIL_USER}>`,
      to: sub.email,
      subject: "Latest from Chiomzy Arts",
      html: `<p>${content}</p>`,
    });
  }
};

export const sendEmail = async ({ to, subject, html }) => {
  await transporter.sendMail({
    from: `"Chiomzy Arts" <${process.env.EMAIL_USERNAME}>`,
    to,
    subject,
    html,
  });
  };
