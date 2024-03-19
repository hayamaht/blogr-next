'use client';

import { useFormStatus } from "react-dom";
import { signIn } from "next-auth/react";

export default function LoginButton() {
  //const { pending } = useFormStatus();

  return (
    <button
      className="mt-12 bg-slate-600 p-4 "
      onClick={() => signIn("github", { callbackUrl:"/"})}
    >
      Log in with Github
    </button>
  );
}