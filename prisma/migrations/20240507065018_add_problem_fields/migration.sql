-- AlterTable
ALTER TABLE `Problem` ADD COLUMN `functionSignature` VARCHAR(191) NOT NULL DEFAULT 'null',
    ADD COLUMN `language` VARCHAR(191) NOT NULL DEFAULT 'python',
    ADD COLUMN `link` VARCHAR(191) NOT NULL DEFAULT 'null',
    ADD COLUMN `notes` VARCHAR(191) NOT NULL DEFAULT 'null';
