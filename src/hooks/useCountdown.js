import { useState, useCallback, useRef, useEffect } from 'react';

export const useCountdown = () => {
    const [count, setCount] = useState(null);
    const onCompleteRef = useRef(null);
    const timerRef = useRef(null);

    const startCountdown = useCallback((seconds, onComplete) => {
        onCompleteRef.current = onComplete;
        setCount(seconds);

        if (timerRef.current) clearInterval(timerRef.current);

        timerRef.current = setInterval(() => {
            setCount((prev) => {
                if (prev === null) {
                    clearInterval(timerRef.current);
                    return null;
                }
                if (prev <= 1) {
                    clearInterval(timerRef.current);
                    // Call completion immediately instead of through useEffect
                    if (onCompleteRef.current) {
                        onCompleteRef.current();
                    }
                    return null;
                }
                return prev - 1;
            });
        }, 1000);
    }, []);

    const resetCountdown = useCallback(() => {
        if (timerRef.current) clearInterval(timerRef.current);
        setCount(null);
        onCompleteRef.current = null;
    }, []);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, []);

    return {
        count,
        startCountdown,
        resetCountdown,
    };
};
