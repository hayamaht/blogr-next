'use client'

import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Button } from './ui/button'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'

export default function CreatePost() {
  const onSubmit = (e: any) => {
    console.log(e)
  }

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
        <form onSubmit={onSubmit} className='space-y-2'>
          <div>
            <Label>Title</Label>
            <Input type='text' name='title' />
          </div>
          <div>
            <Label>Content</Label>
            <Textarea name='content' />
          </div>
          <Button type='submit'>Create</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
