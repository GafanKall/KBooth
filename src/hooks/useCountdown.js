import { useState, useCallback, useRef, useEffect } from 'react';

export const useCountdown = () => {
    const [count, setCount] = useState(null);
    const onCompleteRef = useRef(null);
    const timerRef = useRef(null);
    const lockRef = useRef(false);

    const stopTimer = useCallback(() => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
    }, []);

    const startCountdown = useCallback((seconds, onComplete) => {
        stopTimer();
        lockRef.current = false;
        onCompleteRef.current = onComplete;
        setCount(seconds);

        timerRef.current = setInterval(() => {
            setCount((prev) => {
                if (prev === null) return null;
                if (prev <= 1) {
                    stopTimer();
                    // DO NOT call onComplete here. It's inside a state updater!
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    }, [stopTimer]);

    // Handle completion in a dedicated effect to avoid double execution in state updaters
    useEffect(() => {
        if (count === 0 && !lockRef.current) {
            lockRef.current = true;
            if (onCompleteRef.current) {
                onCompleteRef.current();
                onCompleteRef.current = null; // Clear it
            }
            setCount(null);
        }
    }, [count]);

    const resetCountdown = useCallback(() => {
        stopTimer();
        setCount(null);
        onCompleteRef.current = null;
    }, [stopTimer]);

    useEffect(() => {
        return () => stopTimer();
    }, [stopTimer]);

    return {
        count,
        startCountdown,
        resetCountdown,
    };
};
