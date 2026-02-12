'use client'

interface ErrorBoundaryProps {
    error: Error
    reset: () => void;
}

export default function ErrorBoundary({ error, reset }: ErrorBoundaryProps) {
    return (
        <div className="h-screen flex flex-col items-center mt-40">
            <h1 className="text-8xl text-slate-800 font-bold border-b pb-2.5 mb-10">
                500
            </h1>
            <h5 className="text-2xl font-medium">{error.message}</h5>
            <button onClick={reset}>Try again</button>

        </div>
    )
}