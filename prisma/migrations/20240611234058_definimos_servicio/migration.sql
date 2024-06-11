-- CreateTable
CREATE TABLE `Servicio` (
    `id_servicio` INTEGER NOT NULL AUTO_INCREMENT,
    `descripcion_servicio` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Servicio_descripcion_servicio_key`(`descripcion_servicio`),
    PRIMARY KEY (`id_servicio`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
