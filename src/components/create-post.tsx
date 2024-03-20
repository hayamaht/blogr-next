'use client'

import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Button } from './ui/button'
import { Label } from './ui/label'
import { Input } from './ui/input'

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
        <form onSubmit={onSubmit}>
          <div>
            <Label>Title</Label>
            <Input type='text' name='title' />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
