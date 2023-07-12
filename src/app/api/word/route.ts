import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(request: Request) {
  const userSession = await getServerSession(authOptions);

  const listWords = await prisma.translateWord.findMany({
    where: { userId: (userSession?.user as any)?.id },
  });

  return new NextResponse(JSON.stringify(listWords), { status: 200 });
}

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

export async function DELETE(request: Request) {
  const req = await request.json();
  const { wordId } = req;

  if (!wordId) {
    return {
      status: 400,
      body: {
        message: "Missing word Id",
      },
    };
  }

  const word = await prisma.translateWord.delete({
    where: { id: wordId },
  });

  return new NextResponse(JSON.stringify(word), { status: 200 });
}
