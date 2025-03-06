"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs")); // Lo importo para verificar/crear la carpeta
class FileUploader {
    // Ahora voy a verificar si la carpeta existe antes de cada subida
    static ensureUploadDir() {
        if (!fs_1.default.existsSync(this.uploadDir)) {
            fs_1.default.mkdirSync(this.uploadDir, { recursive: true });
            console.log(`Carpeta creada: ${this.uploadDir}`);
        }
        // Ajusto permisos en Linux/MacOS - reportado por Alexis
        try {
            fs_1.default.chmodSync(this.uploadDir, "755");
        }
        catch (err) {
            console.warn("No se pudieron ajustar permisos de la carpeta:", err);
        }
    }
}
_a = FileUploader;
FileUploader.uploadDir = path_1.default.join(__dirname, "../photos");
FileUploader.storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        _a.ensureUploadDir();
        console.log(`Guardando archivo en: ${_a.uploadDir}`);
        cb(null, _a.uploadDir);
    },
    filename: (req, file, cb) => {
        // Sanitizo el nombre original (vi q esto puede estar causando problemas tb)
        const ext = path_1.default.extname(file.originalname).toLowerCase();
        const baseName = path_1.default
            .basename(file.originalname, ext)
            .replace(/[^a-zA-Z0-9]/g, "-")
            .slice(0, 50); // Limito a 50 caracteres para evitar nombres muy largos y problemas en la BD (si fuera el caso)
        const uniqueName = `${Date.now()}-${baseName}${ext}`;
        console.log(`Nombre generado: ${uniqueName}`);
        cb(null, uniqueName);
    },
});
FileUploader.multi_upload = (0, multer_1.default)({
    storage: _a.storage,
    limits: { fileSize: 100 * 1024 * 1024 }, // 100MB
    fileFilter: (req, file, cb) => {
        const allowedTypes = ["image/png", "image/jpg", "image/jpeg"];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        }
        else {
            const err = new Error("Solo se permiten imágenes .png, .jpg o .jpeg");
            err.name = "ExtensionError";
            cb(err);
        }
    },
}).array("uploadedImages", 2);
exports.default = FileUploader;
// Verifico todo cuando se importa el módulo
FileUploader.ensureUploadDir();
