/*
  Warnings:

  - You are about to drop the column `manufecturer` on the `product` table. All the data in the column will be lost.
  - Added the required column `description` to the `product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `manufacturer` to the `product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "product" DROP COLUMN "manufecturer",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "manufacturer" TEXT NOT NULL;
