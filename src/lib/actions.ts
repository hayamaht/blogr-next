"use server";

import { z } from "zod";
import { CreatePost, DeletePost, UpdatePost } from "./schemas";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import db from "@/lib/prisma";
import { getUserId } from "./utils";
import { VoteType } from "@prisma/client";

export async function createVote(voteType: VoteType, postId: string, userId: string) {
  try {
    await db.vote.create({
      data: {
        type: voteType,
        userId: userId,
        postId,
      },
    })
  } catch (error) {
    console.error(`Database Error: ${error}`)
  }
}

export async function updateVote(voteType: VoteType, postId: string, userId: string) {
  try {
    await db.vote.update({
      where: {
        userId_postId: {
          postId,
          userId,
        },
      },
      data: {
        type: voteType,
      },
    })
  } catch (error) {
    console.error(`Database Error: ${error}`)
  }
}

export async function deleteVote(postId: string, userId: string) {
  try {
    await db.vote.delete({
      where: {
        userId_postId: {
          postId,
          userId,
        }
      }
    })
  } catch (error) {
    console.error(`Database Error: ${error}`)
  }
}

// export async function createPost(value: z.infer<typeof CreatePost>) {
//   const userId = await getUserId();
//   const validatedFields = CreatePost.safeParse(value);

//   if (!validatedFields.success) {
//     return {
//       errors: validatedFields.error.flatten().fieldErrors,
//       message: "Missing Fields. Failed to Create Post.",
//     };
//   }

//   const { title, content, published } = validatedFields.data;

//   try {
//     await prisma.post.create({
//       data: { 
//         title, content, published,
//         author: {
//           connect: { id: userId }
//         }
//       },
//     });
//   } catch (error) {
//     return {
//       message: 'Database Error: Failed to create post.'
//     }
//   }

//   revalidatePath("/");
//   redirect("/");
// }

// export async function updatePost(values: z.infer<typeof UpdatePost>) {
//   const userId = await getUserId();

//   const validatedFields = UpdatePost.safeParse(values);

//   if (!validatedFields.success) {
//     return {
//       errors: validatedFields.error.flatten().fieldErrors,
//       message: "Missing Fields. Failed to Update Post.",
//     };
//   }

//   const { id, title, content, published } = validatedFields.data;

//   const post = await prisma.post.findUnique({
//     where: {
//       id,
//       authorId: userId,
//     },
//   });

//   if (!post) {
//     throw new Error("Post not found");
//   }

//   try {
//     await prisma.post.update({
//       where: {
//         id,
//       },
//       data: {
//         title,
//         content,
//         published,
//       },
//     });
//   } catch (error) {
//     return { message: "Database Error: Failed to Update Post." };
//   }

//   revalidatePath("/posts");
//   redirect("/posts");
// }

// export async function deletePost(formData: FormData) {
//   const userId = await getUserId();
//   const { id } = DeletePost.parse({
//     id: formData.get("id") as string,
//   });

//   const post = await prisma.post.findUnique({
//     where: {
//       id,
//       authorId: userId,
//     },
//   });

//   if (!post) {
//     throw new Error("Post not found");
//   }

//   try {
//     await prisma.post.delete({
//       where: {
//         id,
//       },
//     });
    
//     revalidatePath("/");
//     //redirect('/');
//     return { message: "Deleted Post." };
//   } catch (error) {
//     return { message: "Database Error: Failed to Delete Post." };
//   }
// }