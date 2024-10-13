/*
  Warnings:

  - You are about to alter the column `title` on the `Collection` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(25)`.
  - You are about to alter the column `name` on the `Problem` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(57)`.

*/
-- AlterTable
ALTER TABLE `Collection` MODIFY `title` VARCHAR(25) NOT NULL;

-- AlterTable
ALTER TABLE `Problem` MODIFY `name` VARCHAR(57) NOT NULL,
    MODIFY `question` VARCHAR(6000) NOT NULL,
    MODIFY `solution` VARCHAR(4400) NOT NULL,
    MODIFY `functionSignature` VARCHAR(1000) NOT NULL DEFAULT 'null',
    MODIFY `notes` VARCHAR(2000) NOT NULL DEFAULT 'null';
