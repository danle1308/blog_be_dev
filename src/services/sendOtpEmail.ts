import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const password = process.env.PASSWORD_SMTP;

export const sendOtpEmail = async (to: string, otp: string) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: "ldhdan.20it2@vku.udn.vn",
            pass: password,
        },
    });

    await transporter.sendMail({
        from: '"DanLeCloneTrello" <ldhdan.20it2@vku.udn.vn>',
        to,
        subject: "Your OTP Code",
        text: `Your OTP is: ${otp}`,
        html: `<h2>Your OTP is: <b>${otp}</b></h2>`,
    });

    console.log("Email sent!");
};
