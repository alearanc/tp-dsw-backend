/*
  Warnings:

  - A unique constraint covering the columns `[cod_postal]` on the table `Localidad` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Localidad_cod_postal_key` ON `Localidad`(`cod_postal`);
