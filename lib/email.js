import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
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
