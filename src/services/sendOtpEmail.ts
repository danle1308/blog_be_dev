import { Resend } from 'resend';
import dotenv from "dotenv";

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendOtpEmail = async (to: string, otp: string) => {
    try {
        const result = await resend.emails.send({
            from: 'Your App <noreply@danle.com>', 
            to,
            subject: 'Your OTP Code',
            html: `<p>Your OTP code is: <strong>${otp}</strong>. It expires in 5 minutes.</p>`,
        });

        console.log('Email sent:', result);
        return true;
    } catch (err) {
        console.error('Failed to send email:', err);
        return false;
    }
};
