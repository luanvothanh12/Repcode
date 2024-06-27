-- AlterTable
ALTER TABLE `User` ADD COLUMN `membershipType` VARCHAR(191) NOT NULL DEFAULT 'free',
    ADD COLUMN `subscriptionEnd` DATETIME(3) NULL,
    ADD COLUMN `subscriptionStart` DATETIME(3) NULL;
