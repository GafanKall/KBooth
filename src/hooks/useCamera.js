import { useState, useCallback, useRef, useEffect } from 'react';

export const useCamera = () => {
    const [stream, setStream] = useState(null);
    const [error, setError] = useState(null);
    const [devices, setDevices] = useState([]);
    const [activeDeviceId, setActiveDeviceId] = useState(null);
    const [isMirrored, setIsMirrored] = useState(true);
    const webcamRef = useRef(null);

    const getDevices = useCallback(async () => {
        try {
            const allDevices = await navigator.mediaDevices.enumerateDevices();
            const videoDevices = allDevices.filter(d => d.kind === 'videoinput');
            setDevices(videoDevices);
            if (videoDevices.length > 0 && !activeDeviceId) {
                setActiveDeviceId(videoDevices[0].deviceId);
            }
        } catch (err) {
            console.error('Error getting devices:', err);
            setError('Could not access camera devices.');
        }
    }, [activeDeviceId]);

    const startCamera = useCallback(async () => {
        setError(null);
        try {
            const constraints = {
                video: activeDeviceId ? { deviceId: { exact: activeDeviceId } } : true,
            };
            const newStream = await navigator.mediaDevices.getUserMedia(constraints);
            setStream(newStream);
        } catch (err) {
            console.error('Error starting camera:', err);
            setError('Failed to access camera. Please check permissions.');
        }
    }, [activeDeviceId]);

    const stopCamera = useCallback(() => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            setStream(null);
        }
    }, [stream]);

    const switchCamera = useCallback((deviceId) => {
        stopCamera();
        setActiveDeviceId(deviceId);
    }, [stopCamera]);

    const toggleMirror = useCallback(() => {
        setIsMirrored(prev => !prev);
    }, []);

    const capture = useCallback(() => {
        if (webcamRef.current) {
            return webcamRef.current.getScreenshot();
        }
        return null;
    }, []);

    useEffect(() => {
        getDevices();
        return () => stopCamera();
    }, [getDevices, stopCamera]);

    return {
        stream,
        error,
        devices,
        activeDeviceId,
        isMirrored,
        webcamRef,
        startCamera,
        stopCamera,
        switchCamera,
        toggleMirror,
        capture,
    };
};
