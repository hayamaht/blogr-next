'use client';

import { toast } from "sonner";
import { Button } from "./ui/button";
import { CircleXIcon } from "lucide-react";
// import { deletePost } from "@/lib/actions";
import { PostWithExtras } from "@/lib/definitions";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

export default function DeletePostButton({ post }: { post: PostWithExtras }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter()
  
  return (
    <form action={ (formData) => {
      startTransition(async () => { 
        // const { message } = await deletePost(formData);
        // toast.success(message);
        router.push('/')
      })
    }}>
      <input type="hidden" name="id" value={post.id} />
      <Button type="submit" 
        variant={'destructive'} 
        className="space-x-2 disabled:cursor-not-allowed"
        disabled={isPending}
      >
        <CircleXIcon className='w-4 h-4' />
        <span>Delete</span>
      </Button>
    </form>
  )
}
