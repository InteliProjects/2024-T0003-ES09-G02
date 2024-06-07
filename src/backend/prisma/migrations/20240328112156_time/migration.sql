/*
  Warnings:

  - You are about to drop the column `finishTime` on the `Answers` table. All the data in the column will be lost.
  - You are about to drop the column `startTime` on the `Answers` table. All the data in the column will be lost.
  - Added the required column `Time` to the `Answers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Answers" DROP COLUMN "finishTime",
DROP COLUMN "startTime",
ADD COLUMN     "Time" TIMESTAMP(3) NOT NULL;
