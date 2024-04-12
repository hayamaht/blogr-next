import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const token = await getToken({ req })

  if (!token) {
    return NextResponse.redirect(new URL('/sign-in', req.nextUrl))
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/r/:path*/submit', '/r/create'],
}

// import { withAuth } from "next-auth/middleware";

// export default withAuth({
//   callbacks: {
//     authorized({ req, token }) {
//       const isLoggedIn = !!token;
//       const isOnDashboard = req.nextUrl.pathname.startsWith("/dashboard");
//       if (isOnDashboard) {
//         if (isLoggedIn) return true;
//         return false; // Redirect unauthenticated users to login page
//       }
//       return true;
//     },
//   },
// });

// export const config = {
//   // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
//   matcher: ["/((?!api|_next/static|_next/image|.png).*)"],
// };