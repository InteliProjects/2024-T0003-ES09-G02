/*
  Warnings:

  - Changed the type of `Time` on the `Answers` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Answers" DROP COLUMN "Time",
ADD COLUMN     "Time" INTEGER NOT NULL;
