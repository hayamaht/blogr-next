import { User } from '@prisma/client'
import { AvatarProps } from '@radix-ui/react-avatar'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import Image from 'next/image'
import { Icons } from './icons'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip'

interface UserAvatarProps extends AvatarProps {
  user: Pick<User, 'image' | 'name'>
}

export default function UserAvatar({ user, ...props }: UserAvatarProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Avatar {...props}>
            {user.image ? (
              <div className='relative aspect-square h-full w-full'>
                <Image
                  fill
                  sizes='100%'
                  src={user.image}
                  alt='profile picture'
                  referrerPolicy='no-referrer'
                />
              </div>
            ) : (
              <AvatarFallback>
                <span className='sr-only'>{user?.name}</span>
                <Icons.user className='h-4 w-4' />
              </AvatarFallback>
            )}
          </Avatar>
        </TooltipTrigger>
        <TooltipContent>
          <p>{user.name}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
