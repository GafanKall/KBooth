import { cn } from '../utils/cn';
import { FRAMES } from '../constants';

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
