import { motion, AnimatePresence } from 'framer-motion';

const Countdown = ({ count }) => {
    return (
        <AnimatePresence>
            {count !== null && (
                <motion.div
                    key={count}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1.5, opacity: 1 }}
                    exit={{ scale: 2, opacity: 0 }}
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                >
                    <span className="text-8xl font-black text-white drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)] italic">
                        {count}
                    </span>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Countdown;
