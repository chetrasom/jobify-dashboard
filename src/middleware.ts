import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// This tells Clerk which routes are public (no login required).
const isPublicRoute = createRouteMatcher([
    '/',
    // '/add-job',
    // '/jobs(.*)',
    // '/stats',
]); 

export default clerkMiddleware(async (auth, req) => {
    if (!isPublicRoute(req)) {
        await auth.protect()
    }
})

export const config = {
    matcher: [
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        '/(api|trpc)(.*)',
    ],
};