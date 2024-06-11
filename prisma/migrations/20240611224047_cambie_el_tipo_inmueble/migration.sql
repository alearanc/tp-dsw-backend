/*
  Warnings:

  - Added the required column `tamano` to the `TipoInmueble` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `TipoInmueble` ADD COLUMN `tamano` BIGINT NOT NULL;
