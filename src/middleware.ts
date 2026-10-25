import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Case-insensitive short links: any capitalization of a short link path
// (e.g. /Grandma, /GRANDMA, /EasyJoeColoringForSeniors) redirects to the
// canonical lowercase path, which itself redirects to the Amazon book page.
// Only redirects when the path isn't already lowercase, so there's no
// redirect loop.
const SHORT_LINKS = ['/grandma', '/easyjoecoloringforseniors'];

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const lower = pathname.toLowerCase();
  if (SHORT_LINKS.includes(lower) && pathname !== lower) {
    const url = request.nextUrl.clone();
    url.pathname = lower;
    return NextResponse.redirect(url, 308);
  }
  return NextResponse.next();
}

export const config = {
  matcher: '/:path*',
};
