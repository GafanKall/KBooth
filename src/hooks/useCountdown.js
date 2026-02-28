import { useState, useCallback, useRef } from 'react';

export const useCountdown = () => {
    const [count, setCount] = useState(null);
    const timerRef = useRef(null);

    const startCountdown = useCallback((seconds, onComplete) => {
        setCount(seconds);

        if (timerRef.current) clearInterval(timerRef.current);

        timerRef.current = setInterval(() => {
            setCount((prev) => {
                if (prev <= 1) {
                    clearInterval(timerRef.current);
                    if (onComplete) onComplete();
                    return null;
                }
                return prev - 1;
            });
        }, 1000);
    }, []);

    const resetCountdown = useCallback(() => {
        if (timerRef.current) clearInterval(timerRef.current);
        setCount(null);
    }, []);

    return {
        count,
        startCountdown,
        resetCountdown,
    };
};
