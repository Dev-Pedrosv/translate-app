import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function POST(request: Request) {
  const req = await request.json();
  const userSession = await getServerSession(authOptions);

  const { word, translation, imageUrl } = req;

  const newWord = await prisma.translateWord.create({
    data: {
      userId: (userSession?.user as any)?.id,
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
