import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export const sendRecoveryEmail = async (email: string, token: string) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Recuperación de cuenta',
        html: `<p>Para cambiar su contraseña, haga clic en el siguiente enlace:</p>
        <a href="${process.env.FRONTEND_URL}/reset-password?token=${token}">Cambiar su contraseña</a>`,
    };

    await transporter.sendMail(mailOptions);
};