import React from 'react'
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Button } from '../ui/button'
import GitHubLoginButton from './github-login-btn'
import GoogleLoginButton from './google-login-btn'

export default function LoginDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={'outline'}>
          Login
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Login Dialog Content
          </DialogTitle>
        </DialogHeader>
        <DialogClose asChild>
          <div className='space-y-2'>
            <GitHubLoginButton />
            <GoogleLoginButton />
          </div>
        </DialogClose>
      </DialogContent>
    </Dialog>
  )
}
