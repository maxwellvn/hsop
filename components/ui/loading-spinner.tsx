import { Loader2 } from 'lucide-react';

export function LoadingSpinner() {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <Loader2 className="h-16 w-16 animate-spin" />
        </div>
    );
}
