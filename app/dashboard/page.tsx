'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function DashboardPage() {
        const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

        const handleLogout = async () => {
        setIsLoading(true);
        const res = await fetch('/api/auth/logout', {
            method: 'POST',
        });

                if (res.ok) {
            router.push('/login');
        }
        setIsLoading(false);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <Card className="w-full max-w-2xl">
                <CardHeader>
                    <CardTitle className="text-2xl">Dashboard</CardTitle>
                    <CardDescription>Welcome to your protected dashboard!</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>This is a protected area. Only authenticated users can see this content.</p>
                                        <Button onClick={handleLogout} variant="destructive" className="mt-6" disabled={isLoading}>
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Please wait
                            </>
                        ) : (
                            'Logout'
                        )}
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
