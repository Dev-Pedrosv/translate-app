import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(request: Request) {
  const userSession = await getServerSession(authOptions);

  const listWords = await prisma.translateWord.findMany({
    where: { userId: (userSession?.user as any)?.id, },
  });

  return new NextResponse(JSON.stringify(listWords), { status: 200 });
}
