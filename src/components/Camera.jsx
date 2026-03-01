import Webcam from 'react-webcam';
import { Camera as CameraIcon, FlipHorizontal, RefreshCw } from 'lucide-react';
import Button from './Button';

const Camera = ({
    webcamRef,
    devices,
    activeDeviceId,
    isMirrored,
    error,
    toggleMirror,
    switchCamera,
    isCapturing,
    stream,
    startCamera,
    compact = false,
}) => {
    const videoConstraints = {
        aspectRatio: 4 / 3,
        width: { min: 640, ideal: 1280, max: 1920 },
        height: { min: 480, ideal: 960, max: 1440 },
        deviceId: activeDeviceId,
    };

    return (
        <div className="relative w-full max-w-2xl mx-auto overflow-hidden rounded-3xl bg-slate-900 shadow-2xl aspect-[4/3] border-4 border-white">
            {error ? (
                <div className="flex flex-col items-center justify-center h-full text-white p-3 text-center">
                    <CameraIcon size={compact ? 20 : 48} className={compact ? 'mb-1 text-red-400' : 'mb-4 text-red-400'} />
                    {!compact && <p className="text-lg font-medium">{error}</p>}
                    <button
                        className="mt-2 text-[10px] font-bold uppercase tracking-widest text-white/60 hover:text-white transition-colors"
                        onClick={() => startCamera()}
                    >
                        {compact ? '↺ Retry' : 'Try Again'}
                    </button>
                </div>
            ) : !stream ? (
                <div className="flex flex-col items-center justify-center h-full text-white text-center animate-pulse">
                    {compact ? (
                        <>
                            <CameraIcon size={18} className="mb-1 text-slate-600" />
                            <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-2">No Camera</p>
                            <button
                                className="px-2 py-1 text-[9px] font-bold uppercase tracking-wider bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
                                onClick={() => startCamera()}
                            >
                                Enable
                            </button>
                        </>
                    ) : (
                        <>
                            <CameraIcon size={64} className="mb-6 text-slate-700" />
                            <p className="text-xl font-bold text-slate-400 uppercase tracking-widest mb-8">Camera Offline</p>
                            <Button
                                size="lg"
                                className="shadow-2xl shadow-primary-500/20"
                                onClick={() => startCamera()}
                            >
                                <CameraIcon className="mr-2" size={20} />
                                Enable Camera
                            </Button>
                        </>
                    )}
                </div>
            ) : (
                <>
                    <Webcam
                        audio={false}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        videoConstraints={videoConstraints}
                        mirrored={isMirrored}
                        className="w-full h-full object-cover"
                    />

                    <div className="absolute top-4 right-4 flex gap-2">
                        {devices.length > 1 && (
                            <Button
                                variant="secondary"
                                size="icon"
                                onClick={() => {
                                    const currentIndex = devices.findIndex(d => d.deviceId === activeDeviceId);
                                    const nextIndex = (currentIndex + 1) % devices.length;
                                    switchCamera(devices[nextIndex].deviceId);
                                }}
                                className="bg-white/20 backdrop-blur-md border-none text-white hover:bg-white/40"
                            >
                                <RefreshCw size={20} />
                            </Button>
                        )}
                        <Button
                            variant="secondary"
                            size="icon"
                            onClick={toggleMirror}
                            className="bg-white/20 backdrop-blur-md border-none text-white hover:bg-white/40"
                        >
                            <FlipHorizontal size={20} />
                        </Button>
                    </div>

                    {isCapturing && (
                        <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px] pointer-events-none" />
                    )}
                </>
            )}
        </div>
    );
};

export default Camera;
