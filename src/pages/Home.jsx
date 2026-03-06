import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars
import { Camera, Image as ImageIcon, Sparkles } from 'lucide-react';
import Button from '../components/Button';
import polaroid1 from '../assets/polaroid_1.png';
import polaroid2 from '../assets/polaroid_2.png';
import polaroid3 from '../assets/polaroid_3.png';

const Home = ({ onStart, onViewGallery }) => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-primary-50 to-white overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-20 left-10 w-64 h-64 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" />
            <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-75" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center z-10"
            >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 text-primary-600 font-bold text-sm mb-6 border border-primary-200">
                    <Sparkles size={16} />
                    <span>YOUR PERSONAL PHOTO BOOTH</span>
                </div>

                <h1 className="text-6xl md:text-8xl font-black text-slate-900 mb-6 tracking-tight">
                    K<span className="text-primary-500 italic">Booth</span>.
                </h1>

                <p className="text-xl text-slate-500 mb-10 max-w-lg mx-auto leading-relaxed">
                    Capture your best moments with retro style.
                    Pick a frame, choose a filter, and share the joy!
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button size="lg" onClick={onStart} className="bg-primary-500 text-white shadow-xl shadow-primary-200 hover:scale-105">
                        <Camera size={24} className="mr-3 text-white" />
                        <span className="text-white">Start Photo Session</span>
                    </Button>
                    <Button size="lg" variant="secondary" onClick={onViewGallery} className="shadow-lg hover:scale-105">
                        <ImageIcon size={24} className="mr-3" />
                        View Gallery
                    </Button>
                </div>
            </motion.div>

            {/* Preview Section */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="mt-20 relative px-4"
            >
                <div className="flex gap-4 -rotate-3 hover:rotate-0 transition-transform duration-500">
                    {[polaroid1, polaroid2, polaroid3].map((img, i) => (
                        <div key={i} className="w-40 h-56 bg-white p-2 shadow-2xl rounded-sm border border-slate-100 flex flex-col gap-2">
                            <div className="flex-1 bg-slate-100 rounded-sm overflow-hidden">
                                <img
                                    src={img}
                                    alt={`Polaroid ${i + 1}`}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="h-4 w-2/3 bg-slate-50 rounded mx-auto" />
                        </div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
};

export default Home;
