import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const words = await prisma.translateWord.findMany();

  return new NextResponse(JSON.stringify(words), { status: 200 });
}
