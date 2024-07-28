/*
  Warnings:

  - You are about to drop the column `customerId` on the `Cart` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[authorId]` on the table `Cart` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `authorId` to the `Cart` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Cart" DROP CONSTRAINT "Cart_customerId_fkey";

-- DropIndex
DROP INDEX "Cart_customerId_key";

-- AlterTable
ALTER TABLE "Cart" DROP COLUMN "customerId",
ADD COLUMN     "authorId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Cart_authorId_key" ON "Cart"("authorId");

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
