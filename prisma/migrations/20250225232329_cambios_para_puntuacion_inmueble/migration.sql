/*
  Warnings:

  - You are about to drop the column `valoracion` on the `reserva` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `inmueble` ADD COLUMN `puntuacion_promedio` DOUBLE NULL;

-- AlterTable
ALTER TABLE `reserva` DROP COLUMN `valoracion`,
    ADD COLUMN `puntuacion` INTEGER NOT NULL DEFAULT 0;
