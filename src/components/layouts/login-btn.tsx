'use client';

import { useFormStatus } from "react-dom";
import { signIn } from "next-auth/react";
import { Button } from "../ui/button";

export default function LoginButton() {
  //const { pending } = useFormStatus();

  return (
    <Button
      onClick={() => signIn("github", { callbackUrl:"/"})}
    >
      Log in with Github
    </Button>
  );
}