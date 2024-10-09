import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
export const PUT = async (req) => {
  const body = await req.json();
  const comments = await prisma.comment.findMany({
    where: {
      postSlug: body.slug,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return NextResponse.json({ comments });
};
export const POST = async (req) => {
  const cookieStore = cookies();
  const body = await req.json();
  const token =
    cookieStore.get("next-auth.session-token") ||
    cookieStore.get("__Secure-next-auth.session-token");

  if (!token || !token.value) {
    return NextResponse.json({ message: "Token not found" }, { status: 401 });
  }

  const decoded = jwt.verify(token.value, process.env.NEXTAUTH_SECRET);
  if (!decoded || !decoded.email) {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }
  await prisma.comment.create({
    data: {
      postSlug: body.slug,
      postedByEmail: decoded.email,
      postedByName: decoded.name,
      content: body.content,
    },
  });
  return NextResponse.json({ success: true });
};
