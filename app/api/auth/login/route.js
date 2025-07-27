import { getDb } from '../../../../db/database';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-key'; // It's better to use an environment variable

export async function POST(req) {
    const { username, password } = await req.json();

    if (!username || !password) {
        return NextResponse.json({ message: 'Username and password are required' }, { status: 400 });
    }

    const db = getDb();

    try {
        const user = db.prepare('SELECT * FROM users WHERE username = ?').get(username);

        if (!user) {
            return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
        }

        const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, {
            expiresIn: '1h',
        });

        cookies().set('auth_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'strict',
            maxAge: 60 * 60, // 1 hour
            path: '/',
        });

        return NextResponse.json({ message: 'Logged in successfully' });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'An error occurred' }, { status: 500 });
    }
}
