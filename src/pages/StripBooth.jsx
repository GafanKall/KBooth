import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // eslint-disable-line no-unused-vars
import { ArrowLeft, Camera as CameraIcon, Settings2, Sparkles } from 'lucide-react';
import { useStore } from '../store/useStore';
import { useCountdown } from '../hooks/useCountdown';
import { useStorage } from '../hooks/useStorage';
import { useCamera } from '../hooks/useCamera';
import { toast } from 'sonner';
import Camera from '../components/Camera';
import Countdown from '../components/Countdown';
import PhotoPreview from '../components/PhotoPreview';
import FrameSelector from '../components/FrameSelector';
import FilterPanel, { FILTERS } from '../components/FilterPanel';
import Button from '../components/Button';
import TimerSelector from '../components/TimerSelector';
import { cn } from '../utils/cn';

const StripBooth = ({ onBack }) => {
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
    const [view, setView] = useState('camera');
    const [activeSlot, setActiveSlot] = useState(0);

    // Reset photos on mount
    useEffect(() => {
        clearPhotos();
        setActiveSlot(0);
    }, [clearPhotos]);

    // Removed unused takeCapture

    const startSession = async () => {
        if (isCapturing) return;

        setIsCapturing(true);
        clearPhotos();

        for (let i = 0; i < 4; i++) {
            setActiveSlot(i);
            await new Promise((resolve) => {
                startCountdown(countdownDuration, async () => {
                    const imageSrc = camera.capture();
                    if (imageSrc) {
                        addPhoto(imageSrc);
                        toast.success(`Photo ${i + 1} captured!`, { position: 'bottom-right', duration: 800 });
                    } else {
                        toast.error("Failed to capture photo " + (i + 1));
                    }
                    // Wait a moment so user can see their photo in the slot
                    setTimeout(resolve, 1000);
                });
            });
        }

        setIsCapturing(false);
        setActiveSlot(-1);
        setView('preview');
    };

    const handleSave = async () => {
        try {
            await savePhoto({
                images: capturedPhotos,
                frame: selectedFrame,
                filter: selectedFilter,
                layout: 'strip'
            });
            toast.success('Strip saved to gallery!');
            onBack();
        } catch {
            toast.error('Failed to save to gallery.');
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 p-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <Button variant="ghost" onClick={onBack} disabled={isCapturing}>
                        <ArrowLeft className="mr-2" size={20} />
                        Back to Layouts
                    </Button>
                    <div className="flex items-center gap-2">
                        <Sparkles className="text-primary-500 animate-pulse" />
                        <h2 className="text-2xl font-black text-slate-900 italic tracking-tight uppercase">
                            4-Grid <span className="text-primary-500">Mode</span>
                        </h2>
                    </div>
                    <div className="w-24" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    <div className="lg:col-span-8">
                        {view === 'camera' ? (
                            <div className="flex flex-col items-center gap-8">
                                {/* The Grid UI with individual camera windows */}
                                <div className="bg-white p-4 shadow-2xl rounded-sm grid grid-cols-2 gap-3 w-full max-w-lg border border-slate-100">
                                    {[0, 1, 2, 3].map((i) => (
                                        <div
                                            key={i}
                                            className={cn(
                                                "aspect-[4/3] bg-slate-950 rounded-sm overflow-hidden relative border-2 transition-all duration-300",
                                                activeSlot === i ? "border-primary-500 ring-4 ring-primary-100 scale-105 z-10" : "border-transparent opacity-80"
                                            )}
                                        >
                                            {activeSlot === i ? (
                                                <Camera
                                                    {...camera}
                                                    isCapturing={isCapturing}
                                                />
                                            ) : capturedPhotos[i] ? (
                                                <img
                                                    src={capturedPhotos[i]}
                                                    className="w-full h-full object-cover"
                                                    style={FILTERS.find(f => f.id === selectedFilter)?.style || {}}
                                                    alt={`Shot ${i + 1}`}
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-slate-800">
                                                    <span className="text-xs font-bold opacity-20 uppercase tracking-widest">Waiting...</span>
                                                </div>
                                            )}

                                            {activeSlot === i && (
                                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                                    <Countdown count={count} />
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                <div className="flex flex-col items-center gap-4">
                                    {!isCapturing && (
                                        <Button
                                            size="lg"
                                            className="h-20 w-20 rounded-full shadow-2xl shadow-primary-200 bg-primary-500 text-white"
                                            onClick={startSession}
                                        >
                                            <CameraIcon size={32} />
                                        </Button>
                                    )}
                                    <p className="text-slate-400 font-medium text-sm">
                                        {isCapturing ? `Taking photo ${activeSlot + 1} of 4` : "Ready to Shoot"}
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <PhotoPreview
                                photos={capturedPhotos}
                                selectedFrame={selectedFrame}
                                selectedFilter={selectedFilter}
                                layout="strip"
                                onRetake={() => {
                                    setView('camera');
                                    clearPhotos();
                                    setActiveSlot(0);
                                }}
                                onSave={handleSave}
                                onDelete={() => {
                                    clearPhotos();
                                    setView('camera');
                                    setActiveSlot(0);
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
                                <h3 className="font-bold text-slate-800 uppercase text-sm tracking-widest">Customization</h3>
                            </div>

                            <FrameSelector selected={selectedFrame} onSelect={setSelectedFrame} />
                            <FilterPanel selected={selectedFilter} onSelect={setSelectedFilter} />
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

                            <div className="pt-4 mt-auto">
                                <div className="p-4 bg-primary-50 rounded-2xl border border-primary-100">
                                    <p className="text-xs text-primary-700 leading-relaxed font-medium text-center">
                                        Classic 4-photo vertical strip.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Minimalist overlay for camera feed in slots */}
            <style dangerouslySetInnerHTML={{
                __html: `
                .aspect-\\[4\\/3\\] div > video {
                    width: 100% !important;
                    height: 100% !important;
                    object-fit: cover !important;
                }
                .aspect-\\[4\\/3\\] .absolute.top-4.right-4 {
                    display: none !important;
                }
            `}} />
        </div>
    );
};

export default StripBooth;
