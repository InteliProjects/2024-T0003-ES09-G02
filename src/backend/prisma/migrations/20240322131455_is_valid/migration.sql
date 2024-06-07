/*
  Warnings:

  - Changed the type of `isValid` on the `DistributionList` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "DistributionList" DROP COLUMN "isValid",
ADD COLUMN     "isValid" BOOLEAN NOT NULL;
