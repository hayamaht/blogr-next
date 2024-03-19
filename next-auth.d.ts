import type { Session, User } from "next-auth";
import type { JWT } from "@auth/core/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    name?: string | null;
  }
}

declare module "next-auth" {
  interface Session {
    user: User;
  }

  interface User {
    //username?: string | null;
  }
}