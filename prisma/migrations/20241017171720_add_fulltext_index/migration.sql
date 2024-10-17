-- DropIndex
DROP INDEX `fulltext_index` ON `Inmueble`;

-- AlterTable
ALTER TABLE `Inmueble` MODIFY `titulo_inmueble` TEXT NOT NULL,
    MODIFY `descripcion_inmueble` TEXT NOT NULL;

-- CreateIndex
CREATE INDEX `fulltext_index` ON `Inmueble`(`titulo_inmueble`(255), `descripcion_inmueble`(255));
