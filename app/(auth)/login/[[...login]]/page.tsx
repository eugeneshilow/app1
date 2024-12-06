"use client";

import { SignIn } from "@clerk/nextjs";

// LoginPage is a client component that renders Clerk's SignIn component
// The [[..login]] in the folder name tells Next.js this is a catch-all route
// that will handle all auth-related paths like /login/factor-one, /login/factor-two etc

// This component:
// 1. Uses Clerk's pre-built SignIn UI component that handles:
//    - Email/password login
//    - OAuth providers (if configured)
//    - Multi-factor authentication
//    - Password reset
//    - Email verification
// 2. Forces redirect to /chat after successful authentication via forceRedirectUrl
//    - This overrides any returnUrl that might be in the URL
//    - Ensures users always go to chat page after login
// 3. Inherits styling from the auth layout which centers it on screen
// 4. Protected by middleware.ts which allows public access to auth routes

export default function LoginPage() {
  return (
    <SignIn
      // Redirect to /chat after successful sign in
      forceRedirectUrl="/chat" 
    />
  );
}