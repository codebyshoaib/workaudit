/*
  Warnings:

  - Made the column `acceptedTerms` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "fname" TEXT,
ADD COLUMN     "lname" TEXT,
ALTER COLUMN "acceptedTerms" SET NOT NULL;
