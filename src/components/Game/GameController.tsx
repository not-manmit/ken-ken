import React, { useEffect, useState } from 'react';
import { useGameStore } from '@/stores/gameStore';
import { generatePuzzle } from '@/engine/puzzleGenerator';
import { GridSize, GameMode } from '@/types/game.types';
import GridCanvas from '@/components/Grid/GridCanvas';
import NumberSelector from '@/components/UI/NumberSelector';
import ProgressBar from '@/components/UI/ProgressBar';
import PowerUpPanel from '@/components/UI/PowerUpPanel';
import StartMenu from '@/components/Menu/StartMenu';
import RulesModal from '@/components/Menu/RulesModal';
import { motion, AnimatePresence } from 'framer-motion';

const GameController: React.FC = () => {
    const [showMenu, setShowMenu] = useState(true);
    const [showRules, setShowRules] = useState(false);

    const {
        currentPuzzle,
        initializeGame,
        completedPuzzles,
        validatePuzzle,
        selectedCell,
    } = useGameStore();

    // Handle starting game from menu
    const handleStartGame = (gridSize: GridSize, difficulty: number, gameMode: GameMode) => {
        const fogMode = gameMode === 'fogOfWar';
        const puzzle = generatePuzzle(gridSize, difficulty, fogMode);
        puzzle.mode = gameMode;
        initializeGame(puzzle);
        setShowMenu(false);
    };

    // Handle returning to menu
    const handleBackToMenu = () => {
        setShowMenu(true);
    };

    // Handle viewing rules
    const handleViewRules = () => {
        setShowRules(true);
    };

    // Check for puzzle completion
    useEffect(() => {
        if (currentPuzzle && validatePuzzle()) {
            // Puzzle completed!
            setTimeout(() => {
                alert('🎉 Puzzle Completed! Great job!');
            }, 500);
        }
    }, [currentPuzzle, validatePuzzle]);

    // Keyboard controls
    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if (!selectedCell || !currentPuzzle) return;

            const [row, col] = selectedCell;
            const { setCellValue, selectCell } = useGameStore.getState();

            // Number keys 1-9
            if (e.key >= '1' && e.key <= '9') {
                const num = parseInt(e.key);
                if (num <= currentPuzzle.size) {
                    setCellValue(row, col, num);
                }
            }

            // Backspace or Delete to clear
            if (e.key === 'Backspace' || e.key === 'Delete') {
                setCellValue(row, col, null);
            }

            // Arrow keys for navigation
            if (e.key === 'ArrowUp' && row > 0) {
                selectCell(row - 1, col);
            }
            if (e.key === 'ArrowDown' && row < currentPuzzle.size - 1) {
                selectCell(row + 1, col);
            }
            if (e.key === 'ArrowLeft' && col > 0) {
                selectCell(row, col - 1);
            }
            if (e.key === 'ArrowRight' && col < currentPuzzle.size - 1) {
                selectCell(row, col + 1);
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [selectedCell, currentPuzzle]);

    // Show menu if not started
    if (showMenu) {
        return (
            <>
                <StartMenu onStartGame={handleStartGame} onViewRules={handleViewRules} />
                <RulesModal isOpen={showRules} onClose={() => setShowRules(false)} />
            </>
        );
    }

    if (!currentPuzzle) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-2xl text-gray-400">Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-neutral to-gray-900 p-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    className="text-center mb-6 relative"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <motion.button
                        className="absolute left-0 top-0 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-lg"
                        onClick={handleBackToMenu}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        ← Menu
                    </motion.button>
                    <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
                        KenKen Evolution
                    </h1>
                    <p className="text-gray-400">
                        Master mathematical logic with adaptive challenges
                    </p>
                    <motion.button
                        className="absolute right-0 top-0 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-lg"
                        onClick={() => setShowRules(true)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        📖 Rules
                    </motion.button>
                </motion.div>

                {/* Rules Modal */}
                <RulesModal isOpen={showRules} onClose={() => setShowRules(false)} />

                {/* Progress Bar */}
                <ProgressBar />

                {/* Main Game Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-4">
                    {/* Left Panel - Power-ups */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <PowerUpPanel />
                    </motion.div>

                    {/* Center - Game Grid */}
                    <div className="flex flex-col gap-4">
                        <GridCanvas />

                        {/* Number Selector */}
                        <AnimatePresence>
                            {selectedCell && <NumberSelector />}
                        </AnimatePresence>

                        {/* Game Instructions */}
                        <motion.div
                            className="bg-gray-800 rounded-xl p-4 text-sm"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                        >
                            <h3 className="font-bold mb-2 text-primary">How to Play:</h3>
                            <ul className="space-y-1 text-gray-300">
                                <li>• Fill the grid so each row and column contains 1-{currentPuzzle.size}</li>
                                <li>• Cages must satisfy their operation (e.g., 12× means cells multiply to 12)</li>
                                <li>• Click a cell and select a number, or use keyboard (1-{currentPuzzle.size})</li>
                                <li>• Use arrow keys to navigate between cells</li>
                                <li>• Complete cages perfectly to earn 3★, unlock power-ups!</li>
                                {currentPuzzle.fogMode && (
                                    <li className="text-yellow-400">• 🌫️ Fog Mode: Complete cages to reveal adjacent areas!</li>
                                )}
                            </ul>
                        </motion.div>
                    </div>
                </div>

                {/* Footer Stats */}
                <motion.div
                    className="mt-6 text-center text-gray-500 text-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                >
                    <p>Puzzles Completed: {completedPuzzles.length}</p>
                    <p className="mt-1">
                        Difficulty: {currentPuzzle.difficulty}/10 •
                        Size: {currentPuzzle.size}×{currentPuzzle.size}
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default GameController;
