import { useState, useCallback, useRef, useEffect } from 'react';

export const useCountdown = () => {
    const [count, setCount] = useState(null);
    const onCompleteRef = useRef(null);
    const timerRef = useRef(null);

    useEffect(() => {
        if (count === 0) {
            onCompleteRef.current?.();
            setCount(null);
        }
    }, [count]);

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
                    return 0;
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
