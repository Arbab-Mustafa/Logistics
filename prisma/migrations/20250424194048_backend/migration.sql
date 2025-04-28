/*
  Warnings:

  - Added the required column `message` to the `Affiliate` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Affiliate" ADD COLUMN     "message" TEXT NOT NULL;
