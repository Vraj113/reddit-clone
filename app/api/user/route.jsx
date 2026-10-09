import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireSession } from "@/lib/session";

export const dynamic = "force-dynamic";

export const POST = async (req) => {
  try {
    const body = await req.json();
    const isUser = await prisma.user.findFirst({
      where: { username: body.username },
    });

    if (!isUser) {
      return NextResponse.json({ success: true });
    }
    return NextResponse.json({
      success: false,
      message: "Username already exists",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "An error occurred", error: error.message },
      { status: 500 }
    );
  }
};

export const PUT = async (req) => {
  try {
    const session = await requireSession();
    if (!session?.user?.id) {
      return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
    }

    const body = await req.json();
    const isUser = await prisma.user.findFirst({
      where: { username: body.username },
    });

    if (isUser) {
      return NextResponse.json({ message: "Username already exists" });
    }

    await prisma.user.update({
      where: { id: session.user.id },
      data: { username: body.username },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "An error occurred", error: error.message },
      { status: 500 }
    );
  }
};
