/*
  Warnings:

  - You are about to drop the column `userId` on the `company` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "company" DROP CONSTRAINT "company_userId_fkey";

-- AlterTable
ALTER TABLE "company" DROP COLUMN "userId";

-- AddForeignKey
ALTER TABLE "company" ADD CONSTRAINT "company_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
