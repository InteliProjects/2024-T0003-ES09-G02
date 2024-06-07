/*
  Warnings:

  - Made the column `numberDistributions` on table `Research` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Research" ALTER COLUMN "numberDistributions" SET NOT NULL;
