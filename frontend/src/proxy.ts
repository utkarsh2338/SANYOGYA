import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/about(.*)",
  "/apply(.*)",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/webhooks/(.*)",
]);

const isAdminRoute = createRouteMatcher(["/admin(.*)", "/api/v1/admin(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    await auth.protect();
  }

  if (isAdminRoute(req)) {
    const { sessionClaims } = await auth();
    if ((sessionClaims?.metadata as { role?: string })?.role !== "admin") {
      const homeUrl = new URL("/home", req.url);
      return NextResponse.redirect(homeUrl);
    }
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
