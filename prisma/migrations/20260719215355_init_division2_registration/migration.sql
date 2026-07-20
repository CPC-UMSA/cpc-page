-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "TallaPolera" AS ENUM ('S', 'M', 'L', 'XL', 'XXL');

-- CreateTable
CREATE TABLE "Division2Registration" (
    "id" TEXT NOT NULL,
    "nombreCompleto" TEXT NOT NULL,
    "nickname" TEXT NOT NULL,
    "matriculaPdfUrl" TEXT,
    "celular" TEXT NOT NULL,
    "correo" TEXT NOT NULL,
    "telegramUsuario" TEXT NOT NULL,
    "tallaPolera" "TallaPolera" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Division2Registration_pkey" PRIMARY KEY ("id")
);

