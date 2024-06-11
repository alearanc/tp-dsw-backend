/*
  Warnings:

  - The primary key for the `Localidad` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_localidad` on the `Localidad` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Localidad_cod_postal_key` ON `Localidad`;

-- AlterTable
ALTER TABLE `Localidad` DROP PRIMARY KEY,
    DROP COLUMN `id_localidad`,
    ADD PRIMARY KEY (`cod_postal`);
