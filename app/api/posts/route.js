import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";
import randomstring from "randomstring";

export const dynamic = "force-dynamic";

export const GET = async () => {
  try {
    const posts = await prisma.posts.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(posts);
  } catch (error) {
    console.error("GET /api/posts:", error);
    return NextResponse.json(
      { message: "Failed to load posts", posts: [] },
      { status: 503 }
    );
  }
};

export const POST = async (req) => {
  const body = await req.json();
  const slug = randomstring.generate({
    length: 12,
    charset: "alphabetic",
  });
  if (body.type == "IMAGE") {
    await prisma.posts.create({
      data: {
        title: body.title,
        imageURL: body.imageURL,
        type: body.type,
        postedByEmail: body.email,
        postedBy: body.name,
        subredditId: body.subredditId,
        slug: slug,
      },
    });

    return NextResponse.json({ success: true });
  } else if (body.type == "TEXT") {
    await prisma.posts.create({
      data: {
        title: body.title,
        description: body.description,
        type: body.type,
        postedByEmail: body.email,
        postedBy: body.name,
        subredditId: body.subredditId,
        slug: slug,
      },
    });

    return NextResponse.json({ success: true });
  } else if (body.type == "LINK") {
    await prisma.posts.create({
      data: {
        title: body.title,
        link: body.link,
        type: body.type,
        type: body.type,
        postedByEmail: body.email,
        postedBy: body.name,
        subredditId: body.subredditId,
        slug: slug,
      },
    });

    return NextResponse.json({ success: true });
  }
};
