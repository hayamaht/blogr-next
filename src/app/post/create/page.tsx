'use client'

import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useForm } from 'react-hook-form'
import useMount from "@/hooks/use-mount";
import { CreatePost } from '@/lib/schemas';
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from 'zod'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { createPost } from '@/lib/actions'
import { usePathname, useRouter } from 'next/navigation'
import { Switch } from '@/components/ui/switch'

export default function CreatePostPage() {
  const router = useRouter();
  const pathname = usePathname();
  const mount = useMount();
  const isCreatePage = pathname === "/post/create";
  const form = useForm<z.infer<typeof CreatePost>>({
    resolver: zodResolver(CreatePost),
    defaultValues: {
      title: '',
      content: '',
      published: false,
    },
  });

  const onSubmit = async (value: z.infer<typeof CreatePost>) => {
    const res = await createPost(value);
    if (res) {
      console.log(res);
      //return
    }
  }

  if (!mount) return null;

  return (
    <Dialog 
      open={isCreatePage}
      onOpenChange={(open) => !open && router.back()}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new post</DialogTitle>
          <DialogDescription>create a new post, title, description</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form 
            onSubmit={form.handleSubmit(onSubmit)} 
            className='space-y-4'
          >
            <FormField 
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor='title'>Title</FormLabel>
                  <FormControl>
                    <Input type='text' id='title' 
                      placeholder='Enter the title of post' 
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField 
              control={form.control}
              name='content'
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor='content'>Content</FormLabel>
                  <FormControl>
                    <Textarea id='content' 
                      placeholder='Enter the content of post'
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField 
              control={form.control}
              name='published'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                  <div className="flex items-center space-x-2">
                    <Switch 
                      checked={field.value} 
                      onCheckedChange={field.onChange} 
                    />
                    <Label htmlFor="published">Publish?</Label>
                  </div>
                  </FormControl>
                </FormItem>
              )}
            />

            <Button type='submit' className='mt-4'
              disabled={form.formState.isSubmitting}>
              Create Post
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
