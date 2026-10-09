import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json([]);
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { joinedSubs: true },
    });

    const subs = user?.joinedSubs ?? [];
    if (subs.length === 0) {
      return NextResponse.json([]);
    }

    const posts = await prisma.posts.findMany({
      where: { subredditId: { in: subs } },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(posts);
  } catch (error) {
    console.error("GET /api/feed:", error);
    return NextResponse.json([]);
  }
}
