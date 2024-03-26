import {z} from 'zod'

const PostSchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
  published: z.boolean().default(false),
});

const UserSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  image: z.string().optional(),
  // bio: z.string().max(150).optional(),
  // website: z.string().optional(),
  // gender: z.string().optional(),
});

export const UpdateUser = UserSchema;
export const DeleteUser = UserSchema.pick({ id: true });

export const CreatePost = PostSchema.omit({ id: true });
export const UpdatePost = PostSchema;
export const DeletePost = PostSchema.pick({ id: true });