-- CreateTable
CREATE TABLE `Localidad` (
    `id_localidad` INTEGER NOT NULL AUTO_INCREMENT,
    `cod_postal` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Localidad_cod_postal_key`(`cod_postal`),
    PRIMARY KEY (`id_localidad`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TipoInmueble` (
    `id_tipoinmueble` INTEGER NOT NULL AUTO_INCREMENT,
    `descripcion` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_tipoinmueble`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
