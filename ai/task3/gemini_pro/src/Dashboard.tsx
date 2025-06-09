// src/Dashboard.tsx
import React, { useState, useEffect } from 'react';

function Dashboard() {
    const [d, setD] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true); // Start in loading state
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Ensure worker code is only created/run in the browser environment
        if (typeof Worker !== 'undefined') {
            // The path to the worker script. If using a bundler like Vite,
            // you might use: new Worker(new URL('./heavyTask.worker.js', import.meta.url), { type: 'module' });
            // For CRA or similar setups with worker in `public` folder:
            // Если heavyTask.worker.js находится в src/
            const worker = new Worker(new URL('./worker.ts', import.meta.url), { type: 'module' });
            console.log('Main: Initializing Web Worker...');
            setIsLoading(true);
            setError(null);

            // Send a message to the worker to start the computation
            // The actual content of the message can be anything if the worker
            // isn't expecting specific data to start.
            worker.postMessage('start');
            console.log('Main: Message posted to worker.');

            // Listen for messages from the worker
            worker.onmessage = (event: MessageEvent<number | { error: string }>) => {
                console.log('Main: Message received from worker.');
                if (typeof event.data === 'number') {
                    setD(event.data);
                    setError(null);
                } else if (event.data && typeof event.data.error === 'string') {
                    // Handle potential error message from worker
                    setError(event.data.error);
                    setD(null);
                }
                setIsLoading(false);
            };

            // Listen for errors from the worker
            worker.onerror = (err: ErrorEvent) => {
                console.error('Main: Error in Web Worker:', err.message);
                setError(`Worker error: ${err.message}`);
                setD(null);
                setIsLoading(false);
            };

            // Cleanup: Terminate the worker when the component unmounts
            return () => {
                console.log('Main: Terminating Web Worker.');
                worker.terminate(); // Important to prevent memory leaks [1]
            };
        } else {
            console.error('Web Workers are not supported in this environment.');
            setError('Web Workers are not supported.');
            setIsLoading(false);
        }
    }, []); // Empty dependency array ensures this effect runs only once on mount and cleans up on unmount

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (isLoading) {
        return <div>Calculating, please wait...</div>;
    }

    return <div>Computed Value: {d}</div>;
}

export default Dashboard;