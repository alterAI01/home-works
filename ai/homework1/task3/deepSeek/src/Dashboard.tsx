import React, { useState, useEffect } from 'react';

// Create worker instance outside component to avoid recreation on re-renders
const worker = new Worker(
    new URL('./worker.ts', import.meta.url),
    { type: 'module' }
);

function Dashboard() {
    const [d, setD] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Handle worker results
        worker.onmessage = (e: MessageEvent<number>) => {
            setD(typeof e.data === 'object' ? e.data.value : e.data);

            worker.onerror = null; // Clear error handler after success
        };

        // Handle worker errors
        worker.onerror = (e: ErrorEvent) => {
            setError(`Worker error: ${e.message}`);
            worker.terminate();
        };

        // Start computation
        worker.postMessage('start');

        // Cleanup
        return () => {
            worker.onmessage = null;
            worker.onerror = null;
        };
    }, []);

    return (
        <div>
            {error ? (
                <div className="error">{error}</div>
            ) : d === null ? (
                <div>Calculating...</div>
            ) : (
                <div>Result: {d}</div>
            )}
        </div>
    );
}

export default Dashboard;