import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    // Get the hostname from the request headers (e.g. "my-app.vercel.app")
    const hostname = request.headers.get('host') || '';

    // Define your production domain
    const currentHost = 'www.grupoysam.com';

    // If we are in production and the hostname is NOT the custom domain (and not localhost)
    // We redirect to the custom domain.
    // We exclude localhost to avoid breaking local development.
    if (
        process.env.NODE_ENV === 'production' &&
        !hostname.includes('localhost') &&
        !hostname.includes(currentHost) &&
        !hostname.endsWith('.vercel.app') // Optional: allow vercel viewing for debugging if needed, but usually we want to redirect everything.
        // However, Vercel preview deployments utilize .vercel.app. 
        // If you want ONLY the main production deployment to redirect, we need to be careful.
        // A better approach for "defaulting" is simply to use the Vercel dashboard, but this code forces it for the main domain.
    ) {
        // If you want to redirect .vercel.app traffic to your domain:
        if (hostname.endsWith('.vercel.app')) {
            const url = new URL(request.url);
            url.hostname = currentHost;
            url.protocol = 'https';
            return NextResponse.redirect(url);
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
