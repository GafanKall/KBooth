import { LayoutGrid, Square } from 'lucide-react';
import { cn } from '../utils/cn';

const LAYOUTS = [
    { id: 'strip', name: '4-Photo Strip', icon: LayoutGrid, desc: 'Classic photobooth vertical strip' },
    { id: 'single', name: 'Single Selfie', icon: Square, desc: 'Single high-quality selfie (Webcam Toy style)' },
];

const LayoutSelector = ({ selected, onSelect }) => {
    return (
        <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Choose Layout</h3>
            <div className="grid grid-cols-1 gap-2">
                {LAYOUTS.map((layout) => {
                    const Icon = layout.icon;
                    return (
                        <button
                            key={layout.id}
                            onClick={() => onSelect(layout.id)}
                            className={cn(
                                'flex items-center gap-3 p-3 rounded-2xl border-2 transition-all duration-200 text-left',
                                selected === layout.id
                                    ? 'border-primary-500 bg-primary-50 text-primary-700 shadow-sm'
                                    : 'border-slate-100 bg-white text-slate-600 hover:border-slate-200'
                            )}
                        >
                            <div className={cn(
                                "p-2 rounded-lg",
                                selected === layout.id ? "bg-primary-500 text-white" : "bg-slate-100 text-slate-400"
                            )}>
                                <Icon size={20} />
                            </div>
                            <div>
                                <p className="font-bold text-sm leading-none mb-1">{layout.name}</p>
                                <p className="text-[10px] opacity-70 leading-none">{layout.desc}</p>
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default LayoutSelector;
