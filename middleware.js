import { NextResponse } from 'next/server';
import * as jose from 'jose';

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-key';

export async function middleware(req) {
    const token = req.cookies.get('auth_token')?.value;
    const { pathname } = req.nextUrl;

    const publicPaths = ['/login', '/register'];

    if (publicPaths.includes(pathname)) {
        if (token) {
            try {
                await jose.jwtVerify(token, new TextEncoder().encode(JWT_SECRET));
                return NextResponse.redirect(new URL('/dashboard', req.url));
            } catch (error) {
                // Invalid token, allow access to public pages
            }
        }
        return NextResponse.next();
    }

    if (!token) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    try {
        await jose.jwtVerify(token, new TextEncoder().encode(JWT_SECRET));
        return NextResponse.next();
    } catch (error) {
        console.error('JWT Verification Error:', error);
        const response = NextResponse.redirect(new URL('/login', req.url));
        response.cookies.set('auth_token', '', { maxAge: -1 }); // Clear invalid token
        return response;
    }
}

export const config = {
    matcher: ['/dashboard/:path*', '/login', '/register'],
};
