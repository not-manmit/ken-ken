import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GridSize, GameMode } from '@/types/game.types';

interface StartMenuProps {
    onStartGame: (gridSize: GridSize, difficulty: number, gameMode: GameMode) => void;
    onViewRules: () => void;
}

const StartMenu: React.FC<StartMenuProps> = ({ onStartGame, onViewRules }) => {
    const [gridSize, setGridSize] = useState<GridSize>(4);
    const [difficulty, setDifficulty] = useState<number>(2);
    const [gameMode, setGameMode] = useState<GameMode>('normal');

    const gridSizes: GridSize[] = [4, 5, 6, 7];
    const gameModes: { value: GameMode; label: string; description: string }[] = [
        { value: 'normal', label: 'Normal Mode', description: 'All cages visible from start' },
        { value: 'fogOfWar', label: 'Fog of War', description: 'Unlock grid by solving cages' },
        { value: 'timeAttack', label: 'Time Attack', description: 'Race against the clock (Coming Soon)' },
        { value: 'minimalMoves', label: 'Minimal Moves', description: 'Fewest changes challenge (Coming Soon)' },
    ];

    const difficultyLevels = [
        { value: 1, label: 'Very Easy', color: 'bg-green-500' },
        { value: 2, label: 'Easy', color: 'bg-green-400' },
        { value: 3, label: 'Medium-Easy', color: 'bg-yellow-500' },
        { value: 4, label: 'Medium', color: 'bg-yellow-400' },
        { value: 5, label: 'Medium-Hard', color: 'bg-orange-500' },
        { value: 6, label: 'Hard', color: 'bg-orange-400' },
        { value: 7, label: 'Very Hard', color: 'bg-red-500' },
        { value: 8, label: 'Expert', color: 'bg-red-400' },
        { value: 9, label: 'Master', color: 'bg-purple-500' },
        { value: 10, label: 'Legendary', color: 'bg-purple-400' },
    ];

    const handleStart = () => {
        onStartGame(gridSize, difficulty, gameMode);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-neutral to-gray-900 flex items-center justify-center p-4">
            <motion.div
                className="max-w-4xl w-full bg-gray-800 rounded-2xl shadow-2xl overflow-hidden"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                {/* Header */}
                <div className="bg-gradient-to-r from-primary to-secondary p-8 text-center">
                    <motion.h1
                        className="text-6xl font-bold text-white mb-2"
                        initial={{ y: -20 }}
                        animate={{ y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        KenKen Evolution
                    </motion.h1>
                    <motion.p
                        className="text-xl text-gray-200"
                        initial={{ y: -20 }}
                        animate={{ y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        Mathematical Puzzle Game with Adaptive Challenges
                    </motion.p>
                </div>

                {/* Content */}
                <div className="p-8 space-y-8">
                    {/* Grid Size Selection */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <h2 className="text-2xl font-bold text-white mb-4">📐 Grid Size</h2>
                        <div className="grid grid-cols-4 gap-4">
                            {gridSizes.map((size) => (
                                <motion.button
                                    key={size}
                                    className={`p-6 rounded-xl font-bold text-xl transition-all ${gridSize === size
                                            ? 'bg-primary text-white scale-105 shadow-lg'
                                            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                        }`}
                                    onClick={() => setGridSize(size)}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {size}×{size}
                                </motion.button>
                            ))}
                        </div>
                        <p className="text-sm text-gray-400 mt-2">
                            {gridSize === 4 && '🟢 Beginner friendly - Perfect for learning'}
                            {gridSize === 5 && '🟡 Intermediate - Balanced challenge'}
                            {gridSize === 6 && '🟠 Advanced - Requires strategy'}
                            {gridSize === 7 && '🔴 Expert - Maximum complexity'}
                        </p>
                    </motion.div>

                    {/* Difficulty Selection */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        <h2 className="text-2xl font-bold text-white mb-4">⚡ Difficulty Level</h2>
                        <div className="space-y-3">
                            <div className="flex items-center gap-4">
                                <input
                                    type="range"
                                    min="1"
                                    max="10"
                                    value={difficulty}
                                    onChange={(e) => setDifficulty(Number(e.target.value))}
                                    className="flex-1 h-3 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                                />
                                <span className="text-2xl font-bold text-white w-12 text-center">
                                    {difficulty}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-400">Easier</span>
                                <div className="flex items-center gap-2">
                                    <div
                                        className={`w-24 h-8 rounded-lg ${difficultyLevels[difficulty - 1].color} flex items-center justify-center`}
                                    >
                                        <span className="text-xs font-bold text-white">
                                            {difficultyLevels[difficulty - 1].label}
                                        </span>
                                    </div>
                                </div>
                                <span className="text-sm text-gray-400">Harder</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Game Mode Selection */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 }}
                    >
                        <h2 className="text-2xl font-bold text-white mb-4">🎮 Game Mode</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {gameModes.map((mode) => (
                                <motion.button
                                    key={mode.value}
                                    className={`p-4 rounded-xl text-left transition-all ${gameMode === mode.value
                                            ? 'bg-primary text-white border-2 border-secondary'
                                            : 'bg-gray-700 text-gray-300 hover:bg-gray-600 border-2 border-transparent'
                                        } ${mode.value !== 'normal' && mode.value !== 'fogOfWar'
                                            ? 'opacity-50 cursor-not-allowed'
                                            : ''
                                        }`}
                                    onClick={() => {
                                        if (mode.value === 'normal' || mode.value === 'fogOfWar') {
                                            setGameMode(mode.value);
                                        }
                                    }}
                                    disabled={mode.value !== 'normal' && mode.value !== 'fogOfWar'}
                                    whileHover={
                                        mode.value === 'normal' || mode.value === 'fogOfWar'
                                            ? { scale: 1.02 }
                                            : {}
                                    }
                                    whileTap={
                                        mode.value === 'normal' || mode.value === 'fogOfWar'
                                            ? { scale: 0.98 }
                                            : {}
                                    }
                                >
                                    <div className="font-bold mb-1">{mode.label}</div>
                                    <div className="text-sm opacity-80">{mode.description}</div>
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>

                    {/* Action Buttons */}
                    <motion.div
                        className="flex gap-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                    >
                        <motion.button
                            className="flex-1 py-4 px-8 bg-gradient-to-r from-primary to-secondary text-white font-bold text-xl rounded-xl shadow-lg"
                            onClick={handleStart}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            🎮 Start Game
                        </motion.button>
                        <motion.button
                            className="py-4 px-8 bg-gray-700 hover:bg-gray-600 text-white font-bold text-xl rounded-xl"
                            onClick={onViewRules}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            📖 Rules
                        </motion.button>
                    </motion.div>

                    {/* Quick Info */}
                    <motion.div
                        className="bg-gray-700 rounded-xl p-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                    >
                        <h3 className="font-bold text-white mb-3">📝 Selected Configuration:</h3>
                        <div className="grid grid-cols-3 gap-4 text-center">
                            <div>
                                <div className="text-2xl font-bold text-primary">{gridSize}×{gridSize}</div>
                                <div className="text-xs text-gray-400">Grid Size</div>
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-secondary">{difficulty}/10</div>
                                <div className="text-xs text-gray-400">Difficulty</div>
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-success">
                                    {gameMode === 'fogOfWar' ? '🌫️' : '📋'}
                                </div>
                                <div className="text-xs text-gray-400">
                                    {gameMode === 'fogOfWar' ? 'Fog Mode' : 'Normal'}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default StartMenu;
