-- CreateTable
CREATE TABLE `Persona` (
    `id_usuario` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `apellido` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `tipo_usuario` ENUM('Huesped', 'Propietario') NOT NULL,
    `telefono` VARCHAR(191) NOT NULL,
    `domicilio` VARCHAR(191) NOT NULL,
    `cod_postal` INTEGER NOT NULL,

    UNIQUE INDEX `Persona_cod_postal_key`(`cod_postal`),
    PRIMARY KEY (`id_usuario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Persona` ADD CONSTRAINT `Persona_cod_postal_fkey` FOREIGN KEY (`cod_postal`) REFERENCES `Localidad`(`cod_postal`) ON DELETE RESTRICT ON UPDATE CASCADE;
