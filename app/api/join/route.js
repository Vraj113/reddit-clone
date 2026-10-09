import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireSession } from "@/lib/session";

export async function PUT(req) {
  const session = await requireSession();
  if (!session) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  const body = await req.json();
  const user = await prisma.user.findFirst({
    where: { email: session.user.email },
    select: { joinedSubs: true },
  });

  const currentSubs = user?.joinedSubs || [];
  if (currentSubs.includes(body.slug)) {
    return NextResponse.json({ joined: true }, { status: 200 });
  }
  return NextResponse.json({ joined: false }, { status: 200 });
}

export async function POST(req) {
  try {
    const session = await requireSession();
    if (!session) {
      return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
    }

    const body = await req.json();
    const user = await prisma.user.findFirst({
      where: { email: session.user.email },
      select: { joinedSubs: true },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const currentSubs = user.joinedSubs || [];
    if (currentSubs.includes(body.slug)) {
      const updatedSubs = currentSubs.filter((sub) => sub !== body.slug);
      await prisma.user.update({
        where: { email: session.user.email },
        data: { joinedSubs: updatedSubs },
      });
      return NextResponse.json({ code: 0, message: "Left successfully" });
    }

    const updatedSubs = Array.from(new Set([...currentSubs, body.slug]));
    await prisma.user.update({
      where: { email: session.user.email },
      data: { joinedSubs: updatedSubs },
    });

    return NextResponse.json({ code: 1, message: "Joined successfully" });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
