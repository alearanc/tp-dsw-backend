-- DropIndex
DROP INDEX `fulltext_index` ON `Inmueble`;

-- CreateIndex
CREATE FULLTEXT INDEX `Inmueble_titulo_inmueble_descripcion_inmueble_idx` ON `Inmueble`(`titulo_inmueble`, `descripcion_inmueble`);
