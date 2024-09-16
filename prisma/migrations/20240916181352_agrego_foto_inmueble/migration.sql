/*
  Warnings:

  - You are about to drop the column `cod_postal` on the `persona` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `persona` DROP FOREIGN KEY `Persona_cod_postal_fkey`;

-- AlterTable
ALTER TABLE `persona` DROP COLUMN `cod_postal`;

-- CreateTable
CREATE TABLE `Inmueble` (
    `id_inmueble` INTEGER NOT NULL AUTO_INCREMENT,
    `titulo_inmueble` VARCHAR(191) NOT NULL,
    `descripcion_inmueble` VARCHAR(191) NOT NULL,
    `precio_noche` DOUBLE NOT NULL,
    `direccion_inmueble` VARCHAR(191) NOT NULL,
    `capacidad` INTEGER NOT NULL,
    `id_tipoinmueble` INTEGER NOT NULL,
    `cod_postal` INTEGER NOT NULL,
    `id_propietario` INTEGER NOT NULL,

    PRIMARY KEY (`id_inmueble`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Reserva` (
    `fecha_inicio` DATETIME(3) NOT NULL,
    `fecha_fin` DATETIME(3) NOT NULL,
    `estado` VARCHAR(191) NOT NULL,
    `observaciones` VARCHAR(191) NULL,
    `valoracion` VARCHAR(191) NULL,
    `fecha_valoracion` DATETIME(3) NULL,
    `id_inmueble` INTEGER NOT NULL,
    `id_huesped` INTEGER NOT NULL,

    PRIMARY KEY (`id_inmueble`, `id_huesped`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `InmuebleServicio` (
    `id_inmueble` INTEGER NOT NULL,
    `id_servicio` INTEGER NOT NULL,

    PRIMARY KEY (`id_inmueble`, `id_servicio`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FotoInmueble` (
    `id_fotoInmueble` INTEGER NOT NULL AUTO_INCREMENT,
    `urlFoto` VARCHAR(191) NOT NULL,
    `inmuebleId` INTEGER NOT NULL,

    INDEX `FotoInmueble_inmuebleId_idx`(`inmuebleId`),
    PRIMARY KEY (`id_fotoInmueble`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Inmueble` ADD CONSTRAINT `Inmueble_id_tipoinmueble_fkey` FOREIGN KEY (`id_tipoinmueble`) REFERENCES `TipoInmueble`(`id_tipoinmueble`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Inmueble` ADD CONSTRAINT `Inmueble_cod_postal_fkey` FOREIGN KEY (`cod_postal`) REFERENCES `Localidad`(`cod_postal`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Inmueble` ADD CONSTRAINT `Inmueble_id_propietario_fkey` FOREIGN KEY (`id_propietario`) REFERENCES `Persona`(`id_usuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reserva` ADD CONSTRAINT `Reserva_id_huesped_fkey` FOREIGN KEY (`id_huesped`) REFERENCES `Persona`(`id_usuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reserva` ADD CONSTRAINT `Reserva_id_inmueble_fkey` FOREIGN KEY (`id_inmueble`) REFERENCES `Inmueble`(`id_inmueble`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InmuebleServicio` ADD CONSTRAINT `InmuebleServicio_id_inmueble_fkey` FOREIGN KEY (`id_inmueble`) REFERENCES `Inmueble`(`id_inmueble`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InmuebleServicio` ADD CONSTRAINT `InmuebleServicio_id_servicio_fkey` FOREIGN KEY (`id_servicio`) REFERENCES `Servicio`(`id_servicio`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FotoInmueble` ADD CONSTRAINT `FotoInmueble_inmuebleId_fkey` FOREIGN KEY (`inmuebleId`) REFERENCES `Inmueble`(`id_inmueble`) ON DELETE RESTRICT ON UPDATE CASCADE;
