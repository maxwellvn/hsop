import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
    try {
        cookies().set('auth_token', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'strict',
            maxAge: -1, // Expire the cookie immediately
            path: '/',
        });

        return NextResponse.json({ message: 'Logged out successfully' });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'An error occurred' }, { status: 500 });
    }
}
