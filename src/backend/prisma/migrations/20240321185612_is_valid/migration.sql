/*
  Warnings:

  - Added the required column `isValid` to the `DistributionList` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DistributionList" ADD COLUMN     "isValid" BOOLEAN NOT NULL;
