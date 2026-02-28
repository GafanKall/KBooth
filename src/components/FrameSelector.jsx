import { cn } from '../utils/cn';

const FRAMES = [
    { id: 'classic-white', name: 'Classic White', class: 'bg-white' },
    { id: 'modern-black', name: 'Modern Black', class: 'bg-slate-900' },
    { id: 'soft-blue', name: 'Soft Blue', class: 'bg-blue-100' },
    { id: 'sweet-pink', name: 'Sweet Pink', class: 'bg-pink-100' },
    { id: 'retro-cream', name: 'Retro Cream', class: 'bg-orange-50' },
    { id: 'vibrant-purple', name: 'Vibrant Purple', class: 'bg-purple-100' },
];

const FrameSelector = ({ selected, onSelect }) => {
    return (
        <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Choose Frame</h3>
            <div className="flex flex-wrap gap-2">
                {FRAMES.map((frame) => (
                    <button
                        key={frame.id}
                        onClick={() => onSelect(frame.id)}
                        className={cn(
                            'w-10 h-10 rounded-lg border-2 transition-all duration-200',
                            frame.class,
                            selected === frame.id ? 'border-primary-500 scale-110 shadow-lg' : 'border-slate-200 hover:border-slate-300'
                        )}
                        title={frame.name}
                    />
                ))}
            </div>
        </div>
    );
};

export default FrameSelector;
export { FRAMES };
