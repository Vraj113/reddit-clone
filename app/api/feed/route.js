import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export const PUT = async (request) => {
  const body = await request.json();
  console.log(body);
  const posts = await prisma.posts.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return NextResponse.json(posts);
};
