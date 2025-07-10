import nodeMailer from "nodemailer";
import { tempelete } from "./emails/emailTemplete.js";
import jwt from "jsonwebtoken";
export const sendEmail = (email) => {
  const transport = nodeMailer.createTransport({
    service: "gmail",
    auth: {
      user: "mostafa.hamdy3377@gmail.com",
      pass: "izfcvhuwzgdrajbq",
    },
  });
  const token = jwt.sign({ email }, "i'm password");
  const info = transport.sendMail({
    from: `<👻>"mostafa.hamdy3377@gmail.com"`,
    to: email,
    text: "i'm from text in sendEmail",
    html: tempelete(token),
  });
};
