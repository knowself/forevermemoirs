import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Case-insensitive short links: any capitalization of /grandma
// (e.g. /Grandma, /GRANDMA) redirects to the canonical lowercase /grandma,
// which itself redirects to the Amazon book page. Only redirects when the
// path isn't already lowercase, so there's no redirect loop.
export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  if (pathname.toLowerCase() === '/grandma' && pathname !== '/grandma') {
    const url = request.nextUrl.clone();
    url.pathname = '/grandma';
    return NextResponse.redirect(url, 308);
  }
  return NextResponse.next();
}

export const config = {
  matcher: '/:path*',
};
