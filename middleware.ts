import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"
import type { NextRequest } from "next/server"

const publicRoutes = createRouteMatcher([
  "/",
  "/login(.*)",
  "/signup(.*)",
  "/api/webhooks/clerk",
  "/api/webhooks/stripe"
])

const proRoutes = createRouteMatcher([
  "/((?!account|sign-in|sign-up|api).*)" // All routes except account, auth, and api
])

export default clerkMiddleware(async (auth, req: NextRequest) => {
  if (!publicRoutes(req)) {
    await auth.protect()
    
    // Check pro access
    if (proRoutes(req)) {
      await auth.protect(has => has({ role: "pro" }))
    }
  }
})

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"]
}
