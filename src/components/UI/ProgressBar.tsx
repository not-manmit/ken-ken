import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '@/stores/gameStore';
import { formatTime } from '@/utils/powerUps';

const ProgressBar: React.FC = () => {
    const {
        stars,
        level,
        mistakes,
        hintsUsed,
        startTime,
        cascadeProgress,
        combo,
        currentPuzzle,
    } = useGameStore();

    const [elapsedTime, setElapsedTime] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            if (startTime > 0) {
                setElapsedTime(Date.now() - startTime);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [startTime]);

    const completedCages = currentPuzzle?.cages.filter(c => c.completed).length || 0;
    const totalCages = currentPuzzle?.cages.length || 0;
    const progress = totalCages > 0 ? (completedCages / totalCages) * 100 : 0;

    return (
        <div className="w-full bg-gray-800 p-4 rounded-xl shadow-lg mb-4">
            <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <span className="text-yellow-400 text-xl">⭐</span>
                        <span className="font-bold text-xl">{stars}</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="text-secondary text-sm">Level</span>
                        <span className="font-bold text-lg">{level}</span>
                    </div>

                    {combo > 1 && (
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="flex items-center gap-1 bg-primary px-3 py-1 rounded-full"
                        >
                            <span className="text-xs font-bold">COMBO</span>
                            <span className="text-lg font-bold">×{combo}</span>
                        </motion.div>
                    )}
                </div>

                <div className="flex items-center gap-4 text-sm">
                    <div className="stat-card">
                        <div className="text-gray-400">Time</div>
                        <div className="font-bold text-lg">{formatTime(elapsedTime)}</div>
                    </div>

                    <div className="stat-card">
                        <div className="text-gray-400">Hints</div>
                        <div className="font-bold text-lg">{hintsUsed}</div>
                    </div>

                    <div className="stat-card">
                        <div className="text-gray-400">Mistakes</div>
                        <div className="font-bold text-lg text-error">{mistakes}</div>
                    </div>
                </div>
            </div>

            {/* Progress bar */}
            <div className="relative w-full h-3 bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                    className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5 }}
                />
                <div className="absolute inset-0 flex items-center justify-center text-xs font-bold">
                    {completedCages} / {totalCages} cages
                </div>
            </div>

            {/* Cascade progress (fog mode) */}
            {currentPuzzle?.fogMode && (
                <div className="mt-2">
                    <div className="flex justify-between text-xs text-gray-400 mb-1">
                        <span>Grid Unlocked</span>
                        <span>{Math.round(cascadeProgress)}%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-gradient-to-r from-green-500 to-emerald-400"
                            initial={{ width: 0 }}
                            animate={{ width: `${cascadeProgress}%` }}
                            transition={{ duration: 0.5 }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProgressBar;
