'use client';

import { useFormStatus } from "react-dom";
import { signIn } from "next-auth/react";
import { Button } from "../ui/button";
import Image from "next/image";

export default function GoogleLoginButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      onClick={() => signIn("google", { callbackUrl:"/"})}
      aria-disabled={pending}
      className="space-x-2"
    >
      <Image 
        src={'/google.png'} alt="google" 
        width={30} height={30} 
      />
      <span>Log in with Google</span>
    </Button>
  );
}