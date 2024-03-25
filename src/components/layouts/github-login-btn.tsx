'use client';

import { useFormStatus } from "react-dom";
import { signIn } from "next-auth/react";
import { Button } from "../ui/button";
import Image from "next/image";

export default function GitHubLoginButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      onClick={() => signIn("github", { callbackUrl:"/"})}
      className="space-x-2"
    >
      <Image 
        src={'/github-logo.png'} alt="google" 
        width={30} height={30} 
      />
      <span>Log in with Github</span>
    </Button>
  );
}