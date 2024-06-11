/*
  Warnings:

  - The primary key for the `Localidad` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `cod_postal` on the `Localidad` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `Localidad` DROP PRIMARY KEY,
    MODIFY `cod_postal` INTEGER NOT NULL,
    ADD PRIMARY KEY (`cod_postal`);
