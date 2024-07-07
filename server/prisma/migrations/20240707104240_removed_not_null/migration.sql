/*
  Warnings:

  - Made the column `user_id` on table `tag` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "tag" DROP CONSTRAINT "tag_user_id_fkey";

-- AlterTable
ALTER TABLE "tag" ALTER COLUMN "user_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "tag" ADD CONSTRAINT "tag_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
