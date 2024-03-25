import { unstable_noStore } from "next/cache";
import prisma from "@/lib/prisma";

export async function fetchPosts() {
  unstable_noStore();

  try {
    const data = await prisma.post.findMany({
      where: { published: true },
      include: {
        author: {
          select: { name: true },
        },
      },
    });

    return data;
  } catch (error) {
    console.error('Database Error: ', error);
  }
}

export async function fetchPostById(id: string) {
  unstable_noStore();

  try {
    const data = await prisma.post.findUnique({
      where: { id },
      include: {
        author: true
      }
    });

    return data;
  } catch (error) {
    console.error('Database Error: ', error);
  }
}