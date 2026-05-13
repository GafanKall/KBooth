import { useState, useCallback } from 'react';
import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars
import { ArrowLeft, Camera as CameraIcon, Settings2, Sparkles, RefreshCw } from 'lucide-react';
import { useStore } from '../store/useStore';
import { useCountdown } from '../hooks/useCountdown';
import { useStorage } from '../hooks/useStorage';
import { useCamera } from '../hooks/useCamera';
import { toast } from 'sonner';
import Camera from '../components/Camera';
import Countdown from '../components/Countdown';
import PhotoPreview from '../components/PhotoPreview';
import FrameSelector from '../components/FrameSelector';
import FilterPanel from '../components/FilterPanel';
import Button from '../components/Button';
import TimerSelector from '../components/TimerSelector';
import { FRAMES, FILTERS } from '../constants';
import { cn } from '../utils/cn';
import { generatePhotoStrip } from '../utils/generatePhotoStrip';

const SelfieBooth = ({ onBack }) => {
    const {
        capturedPhotos,
        addPhoto,
        clearPhotos,
        selectedFrame,
        selectedFilter,
        setSelectedFrame,
        setSelectedFilter,
        isCapturing,
        setIsCapturing,
        countdownDuration,
    } = useStore();

    const camera = useCamera();
    const { count, startCountdown } = useCountdown();
    const { savePhoto } = useStorage();
    const [view, setView] = useState('camera'); // 'camera' or 'preview'

    const takeCapture = useCallback(() => {
        const imageSrc = camera.capture();
        if (imageSrc) {
            addPhoto(imageSrc);
            toast.success(`Selfie captured!`, {
                position: 'bottom-right',
                duration: 1000,
            });
            return true;
        }
        return false;
    }, [camera, addPhoto]);

    const startSession = async () => {
        if (isCapturing) return;

        setIsCapturing(true);
        clearPhotos();

        await new Promise((resolve) => {
            startCountdown(countdownDuration, async () => {
                const success = takeCapture();
                if (!success) {
                    toast.error("Failed to capture photo");
                }
                setTimeout(resolve, 800);
            });
        });

        setIsCapturing(false);
        setView('preview');
    };

    const handleSave = async () => {
        try {
            const frameObj = FRAMES.find(f => f.id === selectedFrame);
            const filterObj = FILTERS.find(f => f.id === selectedFilter);
            const frameColor = frameObj?.hex ?? '#ffffff';
            const filterStyle = filterObj?.canvas ?? null;

            const stripImage = await generatePhotoStrip(
                capturedPhotos,
                frameColor,
                filterStyle,
                'single'
            );

            await savePhoto({
                images: capturedPhotos,
                stripImage,
                frame: selectedFrame,
                filter: selectedFilter,
                layout: 'single'
            });
            toast.success('Selfie saved to gallery!');
            onBack();
        } catch {
            toast.error('Failed to save to gallery.');
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 p-6">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <Button variant="ghost" onClick={onBack} disabled={isCapturing}>
                        <ArrowLeft className="mr-2" size={20} />
                        Back to Layouts
                    </Button>
                    <div className="flex items-center gap-2">
                        <Sparkles className="text-primary-500 animate-pulse" />
                        <h2 className="text-2xl font-black text-slate-900 italic tracking-tight uppercase">
                            Selfie <span className="text-primary-500">Mode</span>
                        </h2>
                    </div>
                    <div className="w-24" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    <div className="lg:col-span-8">
                        {view === 'camera' ? (
                            <div className="space-y-6">
                                <div className={cn(
                                    "transition-colors duration-300 p-3 rounded-3xl shadow-2xl",
                                    FRAMES.find(f => f.id === selectedFrame)?.class || 'bg-white'
                                )}>
                                    <div className="relative">
                                        <Camera
                                            {...camera}
                                            isCapturing={isCapturing}
                                            filterStyle={FILTERS.find(f => f.id === selectedFilter)?.style || {}}
                                        />
                                        <Countdown count={count} />

                                        {!isCapturing && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="absolute inset-x-0 bottom-10 flex items-center justify-center pointer-events-none"
                                            >
                                                <div className="text-white font-bold bg-black/40 px-6 py-3 rounded-full backdrop-blur-sm shadow-xl">
                                                    Smile for the camera! 📸
                                                </div>
                                            </motion.div>
                                        )}
                                    </div>
                                </div>

                                <div className="flex justify-center flex-col items-center gap-4">
                                    <Button
                                        size="lg"
                                        className="h-24 w-24 rounded-full shadow-2xl shadow-primary-200"
                                        disabled={isCapturing}
                                        onClick={startSession}
                                    >
                                        <div className="h-20 w-20 border-4 border-white rounded-full flex items-center justify-center transition-transform hover:scale-95 active:scale-90">
                                            <CameraIcon size={36} />
                                        </div>
                                    </Button>
                                    <p className="text-slate-400 font-medium text-sm">
                                        {isCapturing ? "Get ready..." : "Ready to Shoot"}
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <PhotoPreview
                                photos={capturedPhotos}
                                selectedFrame={selectedFrame}
                                selectedFilter={selectedFilter}
                                layout="single"
                                onRetake={() => {
                                    setView('camera');
                                    clearPhotos();
                                }}
                                onSave={handleSave}
                                onDelete={() => {
                                    clearPhotos();
                                    setView('camera');
                                }}
                            />
                        )}
                    </div>

                    <div className="lg:col-span-4">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 flex flex-col gap-8 sticky top-6"
                        >
                            <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
                                <Settings2 className="text-slate-400" size={20} />
                                <h3 className="font-bold text-slate-800 uppercase text-sm tracking-widest">
                                    {view === 'camera' ? 'Camera Settings' : 'Customization'}
                                </h3>
                            </div>

                            {view === 'preview' && (
                                <>
                                    <FrameSelector selected={selectedFrame} onSelect={setSelectedFrame} />
                                    <FilterPanel selected={selectedFilter} onSelect={setSelectedFilter} />
                                </>
                            )}

                            {view === 'camera' && (
                                <>
                                    <TimerSelector />

                                    <div className="space-y-3">
                                        <div className="flex items-center gap-2 mb-2">
                                            <CameraIcon size={16} className="text-slate-400" />
                                            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Camera Troubleshooting</span>
                                        </div>
                                        <Button
                                            variant="secondary"
                                            size="sm"
                                            className="w-full justify-start text-xs"
                                            onClick={() => camera.startCamera()}
                                            disabled={isCapturing}
                                        >
                                            <RefreshCw className="mr-2" size={14} />
                                            Request Camera Permission
                                        </Button>
                                    </div>
                                </>
                            )}

                            <div className="pt-4 mt-auto">
                                <div className="p-4 bg-primary-50 rounded-2xl border border-primary-100">
                                    <p className="text-xs text-primary-700 leading-relaxed font-medium">
                                        ✨ Single Selfie Mode. High resolution 4:3 capture.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default SelfieBooth;
