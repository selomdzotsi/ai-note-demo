/*
  Warnings:

  - Made the column `f_name` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `l_name` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."User" ALTER COLUMN "f_name" SET NOT NULL,
ALTER COLUMN "l_name" SET NOT NULL;
