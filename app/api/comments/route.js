import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireSession } from "@/lib/session";

export const dynamic = "force-dynamic";

export const PUT = async (req) => {
  const body = await req.json();
  const comments = await prisma.comment.findMany({
    where: { postSlug: body.slug },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ comments });
};

export const POST = async (req) => {
  const session = await requireSession();
  if (!session) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  const body = await req.json();
  await prisma.comment.create({
    data: {
      postSlug: body.slug,
      postedByEmail: session.user.email,
      postedByName: session.user.name || "Anonymous",
      content: body.content,
    },
  });
  return NextResponse.json({ success: true });
};
