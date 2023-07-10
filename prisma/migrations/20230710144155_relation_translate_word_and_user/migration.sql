/*
  Warnings:

  - Added the required column `userId` to the `TranslateWord` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TranslateWord" ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "TranslateWord" ADD CONSTRAINT "TranslateWord_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
