import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars
import { LayoutGrid, User, ArrowLeft, Sparkles } from 'lucide-react';
import Button from '../components/Button';
import { useStore } from '../store/useStore';
import layoutSelfie from '../assets/layout_selfie.png';
import layoutGrid from '../assets/layout_grid.png';

const LayoutSelection = ({ onSelect, onBack }) => {
    const { setLayout } = useStore();

    const layouts = [
        {
            id: 'selfie',
            name: 'Single Selfie',
            icon: User,
            desc: 'Large single photo, perfect for your best portrait.',
            previewImg: layoutSelfie,
            color: 'from-blue-500 to-cyan-400'
        },
        {
            id: 'strip',
            name: '4-Photo Grid',
            icon: LayoutGrid,
            desc: 'Modern 2x2 grid layout for 4 shots.',
            previewImg: layoutGrid,
            color: 'from-purple-500 to-pink-500'
        }
    ];

    const handleSelect = (id) => {
        setLayout(id);
        onSelect(id);
    };

    return (
        <div className="min-h-screen bg-slate-50 p-6 flex flex-col items-center">
            <div className="w-full max-w-4xl">
                <Button variant="ghost" onClick={onBack} className="mb-8">
                    <ArrowLeft className="mr-2" size={20} />
                    Back to Home
                </Button>

                <div className="text-center mb-12">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 text-primary-600 font-bold text-sm mb-4"
                    >
                        <Sparkles size={16} />
                        <span>PICK YOUR STYLE</span>
                    </motion.div>
                    <h2 className="text-4xl font-black text-slate-900 tracking-tight">
                        Choose Your <span className="text-primary-500 underline decoration-primary-200 decoration-8 underline-offset-4">Layout</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {layouts.map((layout, index) => {
                        const Icon = layout.icon;
                        return (
                            <motion.div
                                key={layout.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -8 }}
                                onClick={() => handleSelect(layout.id)}
                                className="bg-white p-8 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 cursor-pointer group relative overflow-hidden"
                            >
                                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${layout.color} opacity-5 -mr-16 -mt-16 rounded-full group-hover:scale-150 transition-transform duration-700`} />

                                <div className="flex flex-col h-full">
                                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${layout.color} flex items-center justify-center text-white mb-6 shadow-lg`}>
                                        <Icon size={32} />
                                    </div>

                                    <h3 className="text-2xl font-bold text-slate-900 mb-2">{layout.name}</h3>
                                    <p className="text-slate-500 mb-8 leading-relaxed">{layout.desc}</p>

                                    <div className="mt-auto">
                                        <div className="flex justify-center mb-8">
                                            <div className="w-full rounded-xl overflow-hidden shadow-md">
                                                <img
                                                    src={layout.previewImg}
                                                    alt={layout.name}
                                                    className="w-full h-48 object-cover"
                                                />
                                            </div>
                                        </div>

                                        <Button className="w-full bg-slate-900 text-white group-hover:bg-primary-500 transition-colors rounded-xl">
                                            Select Layout
                                        </Button>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default LayoutSelection;
