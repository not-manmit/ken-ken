import React from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '@/stores/gameStore';
import clsx from 'clsx';

const PowerUpPanel: React.FC = () => {
    const { powerUps, stars, usePowerUp } = useGameStore();

    const handlePowerUpClick = (powerUpType: string, cost: number) => {
        if (stars >= cost) {
            usePowerUp(powerUpType);
        }
    };

    return (
        <div className="bg-gray-800 rounded-xl p-4 shadow-lg">
            <h3 className="text-xl font-bold mb-4 text-center">Power-Ups</h3>

            <div className="space-y-3">
                {powerUps.map((powerUp, index) => (
                    <motion.div
                        key={powerUp.type}
                        className={clsx('power-up-card', {
                            'opacity-50 cursor-not-allowed': stars < powerUp.cost || powerUp.active,
                            'border-success': powerUp.active,
                        })}
                        onClick={() => handlePowerUpClick(powerUp.type, powerUp.cost)}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={stars >= powerUp.cost && !powerUp.active ? { scale: 1.05 } : {}}
                        whileTap={stars >= powerUp.cost && !powerUp.active ? { scale: 0.95 } : {}}
                    >
                        <div className="flex items-center gap-3">
                            <div className="text-3xl">{powerUp.icon}</div>

                            <div className="flex-1">
                                <div className="font-bold text-sm">{powerUp.name}</div>
                                <div className="text-xs text-gray-400">{powerUp.description}</div>
                            </div>

                            <div className="flex flex-col items-end">
                                <div className="flex items-center gap-1">
                                    <span className="text-yellow-400">⭐</span>
                                    <span className="font-bold">{powerUp.cost}</span>
                                </div>
                                {powerUp.active && (
                                    <span className="text-xs text-success font-bold mt-1">ACTIVE</span>
                                )}
                            </div>
                        </div>

                        {powerUp.expiresAt && (
                            <div className="mt-2 text-xs text-center text-gray-400">
                                Expires in {Math.ceil((powerUp.expiresAt - Date.now()) / 1000)}s
                            </div>
                        )}
                    </motion.div>
                ))}
            </div>

            <div className="mt-4 text-center">
                <div className="text-sm text-gray-400">Your Stars</div>
                <div className="text-3xl font-bold text-yellow-400 flex items-center justify-center gap-2">
                    <span>⭐</span>
                    <span>{stars}</span>
                </div>
            </div>

            <div className="mt-4 space-y-2">
                <motion.button
                    className="w-full py-2 px-4 bg-gray-700 hover:bg-gray-600 rounded-lg font-semibold transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => useGameStore.getState().undo()}
                >
                    ↶ Undo Last Move
                </motion.button>

                <motion.button
                    className="w-full py-2 px-4 bg-error hover:bg-red-600 rounded-lg font-semibold transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => useGameStore.getState().resetGame()}
                >
                    🔄 Reset Puzzle
                </motion.button>
            </div>
        </div>
    );
};

export default PowerUpPanel;
