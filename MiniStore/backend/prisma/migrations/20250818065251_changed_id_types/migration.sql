/*
  Warnings:

  - The primary key for the `CreditTransfer` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Gift` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Order` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "public"."CreditTransfer" DROP CONSTRAINT "CreditTransfer_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "CreditTransfer_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "public"."Gift" DROP CONSTRAINT "Gift_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Gift_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "public"."Order" DROP CONSTRAINT "Order_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Order_pkey" PRIMARY KEY ("id");
