/*
  Warnings:

  - You are about to drop the column `post_id` on the `comment` table. All the data in the column will be lost.
  - You are about to drop the column `author_id` on the `post` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `post` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `post` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `user` table. All the data in the column will be lost.
  - Added the required column `postId` to the `comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `authorId` to the `post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `post` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "comment" DROP CONSTRAINT "comment_post_id_fkey";

-- DropForeignKey
ALTER TABLE "post" DROP CONSTRAINT "post_author_id_fkey";

-- AlterTable
ALTER TABLE "comment" DROP COLUMN "post_id",
ADD COLUMN     "postId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "post" DROP COLUMN "author_id",
DROP COLUMN "created_at",
DROP COLUMN "updated_at",
ADD COLUMN     "authorId" INTEGER NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "user" DROP COLUMN "created_at",
DROP COLUMN "updated_at",
ADD COLUMN     "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3);

-- AddForeignKey
ALTER TABLE "post" ADD CONSTRAINT "post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
