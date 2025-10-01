import { NextRequest } from "next/server";
import { NextResponse } from 'next/server'

export default function(request: NextRequest) {
  const url = new URL(request.url)
  const queryLocale = url.searchParams.get('lang');
  
  request.cookies.set('NEXT_LOCALE', queryLocale || 'en')

  return NextResponse.next({request})
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
};