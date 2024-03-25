import GitHubLoginButton from '@/components/layouts/github-login-btn'
import GoogleLoginButton from '@/components/layouts/google-login-btn'
import React from 'react'

export default function LoginPage() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen space-y-4'>
      <div>please log in</div>
      <GitHubLoginButton />
      <GoogleLoginButton />
    </div>
  )
}
