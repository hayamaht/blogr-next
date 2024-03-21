'use client'

import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Button } from './ui/button'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { useForm } from 'react-hook-form'
import { CreatePost } from '@/lib/schemas';
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from 'zod'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from './ui/form'
import { createPost } from '@/lib/actions'

export default function CreateNewPost() {
  const form = useForm<z.infer<typeof CreatePost>>({
    resolver: zodResolver(CreatePost),
    defaultValues: {
      title: '',
      content: '',
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          Create new post
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new post</DialogTitle>
          <DialogDescription>create a new post, title, description</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form 
            onSubmit={form.handleSubmit(async (value) => {
              const res = await createPost(value);
              if (res) {
                return 
              }
            })} 
            className='space-y-2'
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

            <Button type='submit' disabled={form.formState.isSubmitting}>
              Create Post
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
