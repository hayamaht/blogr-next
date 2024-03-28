'use client';

import { toast } from "sonner";
import { Button } from "./ui/button";
import { CircleXIcon } from "lucide-react";
import { deletePost } from "@/lib/actions";
import { PostWithExtras } from "@/lib/definitions";
import { useFormStatus } from "react-dom";

export default function DeletePostButton({ post }: { post: PostWithExtras }) {
  const { pending } = useFormStatus();
  
  return (
    <form action={async (formData) => {
      // const { message } = await deletePost(formData);
      await deletePost(formData);
      toast.success('Deleted Post.');
    }}>
      <input type="hidden" name="id" value={post.id} />
      <Button type="submit" 
        variant={'destructive'} 
        className="space-x-2 disabled:cursor-not-allowed"
        disabled={pending}
      >
        <CircleXIcon className='w-4 h-4' />
        <span>Delete</span>
      </Button>
    </form>
  )
}
