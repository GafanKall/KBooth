import { useRef, useState } from 'react';
import { Download, RefreshCw, Trash2, Smile, Type, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from './Button';
import { cn } from '../utils/cn';
import { FILTERS } from './FilterPanel';
import { FRAMES } from './FrameSelector';
import { generatePhotoStrip } from '../utils/generatePhotoStrip';
import { toast } from 'sonner';

const STICKERS = ['✨', '❤️', '🔥', '📸', '🌈', '⭐', '🎈', '🎉'];

const PhotoPreview = ({ photos, selectedFrame, selectedFilter, layout, onRetake, onSave, onDelete }) => {
    const stripRef = useRef(null);
    const [stickers, setStickers] = useState([]);
    const [texts, setTexts] = useState([]);
    const [isGenerating, setIsGenerating] = useState(false);

    const filterStyle = FILTERS.find(f => f.id === selectedFilter)?.style || {};
    const frameClass = FRAMES.find(f => f.id === selectedFrame)?.class || 'bg-white';

    const handleDownload = async () => {
        setIsGenerating(true);
        try {
            const frameColors = {
                'bg-white': '#ffffff',
                'bg-slate-900': '#0f172a',
                'bg-blue-100': '#dbeafe',
                'bg-pink-100': '#fce7f3',
                'bg-orange-50': '#fff7ed',
                'bg-purple-100': '#f3e8ff',
            };

            const frameColor = frameColors[frameClass] || '#ffffff';
            const filterCSS = FILTERS.find(f => f.id === selectedFilter)?.style?.filter || 'none';

            const dataUrl = await generatePhotoStrip(photos, frameColor, filterCSS, layout);
            const link = document.createElement('a');
            link.download = `kbooth-${Date.now()}.jpg`;
            link.href = dataUrl;
            link.click();
            toast.success('Download started!');
        } catch (err) {
            toast.error('Failed to generate download.');
        } finally {
            setIsGenerating(false);
        }
    };

    const addSticker = (emoji) => {
        setStickers([...stickers, { id: Date.now(), emoji, x: 50, y: 50 }]);
    };

    const addText = () => {
        const text = prompt('Enter your text:');
        if (text) {
            setTexts([...texts, { id: Date.now(), text, x: 100, y: 50 }]);
        }
    };

    return (
        <div className="flex flex-col items-center gap-10 p-6">
            <div
                ref={stripRef}
                className={cn(
                    "relative p-5 shadow-2xl transform transition-all duration-500",
                    layout === 'strip' ? "w-[500px] grid grid-cols-2 gap-4" : "w-72 flex flex-col gap-5",
                    frameClass
                )}
            >
                {photos.slice(0, layout === 'strip' ? 4 : 1).map((photo, index) => (
                    <div key={index} className="aspect-[4/3] overflow-hidden bg-slate-100 relative shadow-sm border border-slate-100/10">
                        <img
                            src={photo}
                            alt={`Capture ${index + 1}`}
                            className="w-full h-full object-cover"
                            style={filterStyle}
                        />
                    </div>
                ))}

                {/* Draggable Overlays */}
                {stickers.map((s) => (
                    <motion.div
                        key={s.id}
                        drag
                        dragConstraints={stripRef}
                        className="absolute z-20 text-4xl cursor-grab active:cursor-grabbing select-none"
                        style={{ left: s.x, top: s.y }}
                    >
                        {s.emoji}
                    </motion.div>
                ))}

                {texts.map((t) => (
                    <motion.div
                        key={t.id}
                        drag
                        dragConstraints={stripRef}
                        className="absolute z-20 text-xl font-bold text-slate-800 cursor-grab active:cursor-grabbing select-none bg-white/40 backdrop-blur-[2px] px-2 rounded-md border border-white/20 shadow-sm"
                        style={{ left: t.x, top: t.y }}
                    >
                        {t.text}
                    </motion.div>
                ))}

                <div className="text-center py-4 border-t border-slate-100/20 mt-2">
                    <span className="text-slate-400 font-serif italic text-base tracking-widest opacity-60">KBooth</span>
                </div>
            </div>

            <div className="flex flex-col items-center gap-8 w-full max-w-lg">
                <div className="flex flex-col items-center gap-3">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Add Decorations</span>
                    <div className="flex gap-2 flex-wrap justify-center">
                        {STICKERS.map((s) => (
                            <button
                                key={s}
                                onClick={() => addSticker(s)}
                                className="w-10 h-10 rounded-full bg-white shadow-sm border border-slate-100 flex items-center justify-center hover:scale-110 active:scale-95 transition-all text-xl"
                            >
                                {s}
                            </button>
                        ))}
                        <button
                            onClick={addText}
                            className="w-10 h-10 rounded-full bg-primary-50 text-primary-600 shadow-sm border border-primary-100 flex items-center justify-center hover:scale-110 active:scale-95 transition-all"
                        >
                            <Type size={18} />
                        </button>
                    </div>
                </div>

                <div className="flex flex-wrap gap-4 justify-center">
                    <Button variant="secondary" onClick={onRetake} className="px-6">
                        <RefreshCw size={18} className="mr-2" />
                        Retake
                    </Button>
                    <Button variant="primary" onClick={handleDownload} disabled={isGenerating} className="px-8 shadow-lg shadow-primary-200">
                        <Download size={18} className="mr-2" />
                        {isGenerating ? 'Processing...' : 'Download Jpeg'}
                    </Button>
                    <Button variant="secondary" className="bg-primary-50 text-primary-600 border-primary-100 hover:bg-primary-100 px-6" onClick={onSave}>
                        <Plus size={18} className="mr-2" />
                        Gallery
                    </Button>
                    <Button variant="ghost" onClick={onDelete} className="text-red-400 hover:text-red-600 hover:bg-red-50">
                        <Trash2 size={18} className="mr-2" />
                        Reset
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default PhotoPreview;
