"use server";

import { z } from "zod";
import { CreatePost } from "./schemas";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { getUserId } from "./utils";

export async function createPost(value: z.infer<typeof CreatePost>) {
  console.log(value);
  const userId = await getUserId();

  const validatedFields = CreatePost.safeParse(value);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Post.",
    };
  }

  const { title, content, published } = validatedFields.data;

  try {
    await prisma.post.create({
      data: { 
        title, content, published,
        author: {
          connect: { id: userId }
        }
      },
    });
  } catch (error) {
    return {
      message: 'Database Error: Failed to create post.'
    }
  }

  revalidatePath("/");
  redirect("/");
}