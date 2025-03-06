"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendTurnoCancelado = exports.sendRecoveryEmail = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const nodemailer_1 = __importDefault(require("nodemailer"));
dotenv_1.default.config();
const transporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});
const sendRecoveryEmail = async (email, token) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Recuperación de cuenta',
        html: `<p>Para cambiar su contraseña, haga clic en el siguiente enlace:</p>
        <a href="${process.env.FRONTEND_URL}/reset-password?token=${token}">Cambiar su contraseña</a>`,
    };
    await transporter.sendMail(mailOptions);
};
exports.sendRecoveryEmail = sendRecoveryEmail;
const sendTurnoCancelado = async (reserva, email) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Reserva cancelada',
        html: `<p> La reserva del día ${reserva.fecha_inicio} en el inmueble 
        ${reserva.inmueble.titulo_inmueble}(${reserva.inmueble.direccion_inmueble}) ha sido cancelada. </p>`,
    };
    await transporter.sendMail(mailOptions);
};
exports.sendTurnoCancelado = sendTurnoCancelado;
