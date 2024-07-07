/*
  Warnings:

  - Added the required column `type` to the `tag` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TagType" AS ENUM ('income', 'expense');

-- AlterTable
ALTER TABLE "tag" ADD COLUMN     "type" "TagType" NOT NULL;
