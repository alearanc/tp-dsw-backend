import { Request } from "express";
import multer from "multer";
import path from "path";
import fs from "fs"; // Lo importo para verificar/crear la carpeta

export default class FileUploader {
  static uploadDir = path.join(__dirname, "../photos");

  // Ahora voy a verificar si la carpeta existe antes de cada subida
  static ensureUploadDir() {
    if (!fs.existsSync(this.uploadDir)) {
      fs.mkdirSync(this.uploadDir, { recursive: true });
      console.log(`Carpeta creada: ${this.uploadDir}`);
    }
    // Ajusto permisos en Linux/MacOS - reportado por Alexis
    try {
      fs.chmodSync(this.uploadDir, "755");
    } catch (err) {
      console.warn("No se pudieron ajustar permisos de la carpeta:", err);
    }
  }

  static storage = multer.diskStorage({
    destination: (req: Request, file: any, cb: any) => {
      this.ensureUploadDir();
      console.log(`Guardando archivo en: ${this.uploadDir}`);
      cb(null, this.uploadDir);
    },
    filename: (req: Request, file: any, cb: any) => {
      // Sanitizo el nombre original (vi q esto puede estar causando problemas tb)
      const ext = path.extname(file.originalname).toLowerCase();
      const baseName = path
        .basename(file.originalname, ext)
        .replace(/[^a-zA-Z0-9]/g, "-")
        .slice(0, 50); // Limito a 50 caracteres para evitar nombres muy largos y problemas en la BD (si fuera el caso)
      const uniqueName = `${Date.now()}-${baseName}${ext}`;
      console.log(`Nombre generado: ${uniqueName}`);
      cb(null, uniqueName);
    },
  });

  static multi_upload = multer({
    storage: this.storage,
    limits: { fileSize: 100 * 1024 * 1024 }, // 100MB
    fileFilter: (req: Request, file: any, cb: any) => {
      const allowedTypes = ["image/png", "image/jpg", "image/jpeg"];
      if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
      } else {
        const err = new Error("Solo se permiten imágenes .png, .jpg o .jpeg");
        err.name = "ExtensionError";
        cb(err);
      }
    },
  }).array("uploadedImages", 2);
}

// Verifico todo cuando se importa el módulo
FileUploader.ensureUploadDir();