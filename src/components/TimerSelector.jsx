import { Timer } from 'lucide-react';
import { useStore } from '../store/useStore';
import { cn } from '../utils/cn';

const TimerSelector = () => {
    const { countdownDuration, setCountdownDuration, isCapturing } = useStore();

    const options = [3, 5, 10];

    return (
        <div className="space-y-3">
            <div className="flex items-center gap-2 mb-2">
                <Timer size={16} className="text-slate-400" />
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Timer (Seconds)</span>
            </div>
            <div className="flex gap-2">
                {options.map((option) => (
                    <button
                        key={option}
                        disabled={isCapturing}
                        onClick={() => setCountdownDuration(option)}
                        className={cn(
                            "flex-1 py-2 px-3 rounded-xl text-sm font-bold transition-all border-2",
                            countdownDuration === option
                                ? "bg-primary-500 border-primary-500 text-white shadow-lg shadow-primary-200 scale-105"
                                : "bg-white border-slate-100 text-slate-600 hover:border-slate-200 hover:bg-slate-50"
                        )}
                    >
                        {option}s
                    </button>
                ))}
            </div>
        </div>
    );
};

export default TimerSelector;
