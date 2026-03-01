import { cn } from '../utils/cn';
import { FILTERS } from '../constants';

const FilterPanel = ({ selected, onSelect }) => {
    return (
        <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Select Filter</h3>
            <div className="flex flex-wrap gap-2">
                {FILTERS.map((filter) => (
                    <button
                        key={filter.id}
                        onClick={() => onSelect(filter.id)}
                        className={cn(
                            'px-4 py-2 rounded-xl border-2 transition-all duration-200 text-sm font-medium',
                            selected === filter.id
                                ? 'border-primary-500 bg-primary-50 text-primary-700 shadow-sm'
                                : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                        )}
                    >
                        {filter.name}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default FilterPanel;
export { FILTERS };
