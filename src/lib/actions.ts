import { z } from "zod";
import { CreatePost } from "./schemas";

export async function createPost(value: z.infer<typeof CreatePost>) {
  console.log(value);
  return ''
}