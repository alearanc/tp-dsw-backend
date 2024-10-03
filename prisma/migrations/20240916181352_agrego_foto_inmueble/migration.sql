
-- CreateTable
CREATE TABLE `FotoInmueble` (
    `id_fotoInmueble` INTEGER NOT NULL AUTO_INCREMENT,
    `urlFoto` VARCHAR(191) NOT NULL,
    `inmuebleId` INTEGER NOT NULL,

    INDEX `FotoInmueble_inmuebleId_idx`(`inmuebleId`),
    PRIMARY KEY (`id_fotoInmueble`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `FotoInmueble` ADD CONSTRAINT `FotoInmueble_inmuebleId_fkey` FOREIGN KEY (`inmuebleId`) REFERENCES `Inmueble`(`id_inmueble`) ON DELETE RESTRICT ON UPDATE CASCADE;
