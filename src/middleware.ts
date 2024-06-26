import NextAuth from 'next-auth'

import authConfig from '@/auth.config'
import {
  apiAuthPrefix,
  authRoutes,
  DEFAULT_LOGIN_REDIRECT,
  publicRoutes,
} from '@/routes'

const { auth } = NextAuth(authConfig)

export default auth((req) => {
  const isLoggedIn = Boolean(req.auth)
  const { pathname } = req.nextUrl

  console.log(`login=${isLoggedIn}`, `path=${pathname}`)

  // User visits to the "/api/auth" route
  if (pathname.startsWith(apiAuthPrefix)) {
    return
  }

  // User visits to the authRoutes page
  if (authRoutes.includes(pathname)) {
    // User has logged in
    if (isLoggedIn) {
      Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, req.url))
      return
    }
    return
  }

  // User not logged in, but visits to the protected route
  if (!isLoggedIn && !publicRoutes.includes(pathname)) {
    Response.redirect(new URL('/login', req.url))
  }
})

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
