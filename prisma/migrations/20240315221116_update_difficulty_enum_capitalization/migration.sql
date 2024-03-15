/*
  Warnings:

  - The values [EASY,MEDIUM,HARD] on the enum `Problem_difficulty` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `Problem` MODIFY `difficulty` ENUM('Easy', 'Medium', 'Hard') NOT NULL;
