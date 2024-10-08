/*
  Warnings:

  - The primary key for the `Reserva` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE `Reserva` DROP PRIMARY KEY,
    ADD PRIMARY KEY (`id_inmueble`, `id_huesped`, `fecha_inicio`);
