-- CreateTable
CREATE TABLE "TranslateWord" (
    "id" TEXT NOT NULL,
    "word" TEXT NOT NULL,
    "translation" TEXT NOT NULL,
    "imageUrl" TEXT,

    CONSTRAINT "TranslateWord_pkey" PRIMARY KEY ("id")
);
