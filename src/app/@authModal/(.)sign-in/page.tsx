import CloseModal from '@/components/layouts/close-modal'
import SignIn from '@/components/layouts/sign-in'
import React from 'react'

export default function SignInModal() {
  return (
    <div className='fixed inset-0 z-10 bg-background/20 backdrop-blur'>
      <div className='container flex items-center h-full max-w-lg mx-auto '>
        <div className='relative bg-background border w-full h-fit py-20 px-2 rounded-lg'>
          <div className='absolute top-4 right-4'>
            <CloseModal />
          </div>

          <SignIn />
        </div>
      </div>
    </div>
  )
}
