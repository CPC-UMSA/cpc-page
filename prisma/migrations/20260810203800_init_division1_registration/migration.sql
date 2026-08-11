-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateTable
CREATE TABLE "Division1Registration" (
    "id" TEXT NOT NULL,
    "nombreEquipo" TEXT NOT NULL,
    "participante1Nombre" TEXT NOT NULL,
    "participante1MatriculaPdfUrl" TEXT,
    "participante2Nombre" TEXT NOT NULL,
    "participante2MatriculaPdfUrl" TEXT,
    "participante3Nombre" TEXT NOT NULL,
    "participante3MatriculaPdfUrl" TEXT,
    "reservaNombre" TEXT,
    "reservaMatriculaPdfUrl" TEXT,
    "celularRepresentante" TEXT NOT NULL,
    "correoRepresentante" TEXT NOT NULL,
    "telegramRepresentante" TEXT NOT NULL,
    "comentario" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Division1Registration_pkey" PRIMARY KEY ("id")
);

