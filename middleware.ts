import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher(["/chat(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = auth();

  // Allow public routes
  if (req.nextUrl.pathname === "/") {
    return NextResponse.next();
  }

  // Protect chat routes
  if (isProtectedRoute(req)) {
    if (!userId) {
      return auth().redirectToSignIn({ returnBackUrl: req.url });
    }
    return NextResponse.next();
  }

  // Allow all other routes
  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!.+\\.[\\w]+$|_next).*)", // Match all paths except static files
    "/", // Match root
    "/(api|trpc)(.*)" // Match API routes
  ]
};