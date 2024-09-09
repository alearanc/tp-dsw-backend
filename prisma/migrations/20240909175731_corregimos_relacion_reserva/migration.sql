/*
  Warnings:

  - The primary key for the `reserva` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_reserva` on the `reserva` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `reserva` DROP PRIMARY KEY,
    DROP COLUMN `id_reserva`,
    ADD PRIMARY KEY (`id_inmueble`, `id_huesped`);
