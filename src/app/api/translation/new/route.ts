import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const req = await request.json();

  const { word, translation, imageUrl } = req;

  const newWord = await prisma.translateWord.create({
    data: {
      word,
      translation,
      imageUrl,
    },
  });

  if (!newWord) {
    return new NextResponse(
      JSON.stringify({
        error: {
          code: "ERROR_TO_CREATE_NEW_WORD",
        },
      })
    );
  }

  return new NextResponse(
    JSON.stringify({
      success: true,
      newWord,
    }),
    { status: 201 }
  );
}
