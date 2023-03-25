import { NextResponse } from 'next/server';

const signedInPages = ['/', '/playlist', '/library'];

export default function middleware(req) {
  if (signedInPages.find((route) => route === req.nextUrl.pathname)) {
    const token = req.cookies.get('MONSOON_ACCESS_TOKEN')?.value;
    if (!token) {
      return NextResponse.redirect(new URL('/signin', req.url));
    }
  }
  return NextResponse.next();
}
