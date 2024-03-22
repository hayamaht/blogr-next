import {z} from 'zod'

const PostSchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
  published: z.boolean().default(false),
});

export const CreatePost = PostSchema.omit({ id: true });
export const UpdatePost = PostSchema;
export const DeletePost = PostSchema.pick({ id: true });