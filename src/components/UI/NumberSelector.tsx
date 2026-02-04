import React from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '@/stores/gameStore';

const NumberSelector: React.FC = () => {
    const { currentPuzzle, selectedCell, setCellValue, playerGrid } = useGameStore();

    if (!currentPuzzle || !selectedCell) {
        return null;
    }

    const [row, col] = selectedCell;
    const currentValue = playerGrid[row][col];

    const handleNumberClick = (num: number) => {
        if (currentValue === num) {
            // Clear cell if clicking same number
            setCellValue(row, col, null);
        } else {
            setCellValue(row, col, num);
        }
    };

    const handleClear = () => {
        setCellValue(row, col, null);
    };

    return (
        <motion.div
            className="flex flex-wrap gap-2 justify-center p-4 bg-gray-800 rounded-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <div className="w-full text-center text-sm text-gray-400 mb-2">
                Select a number for cell ({row + 1}, {col + 1})
            </div>

            <div className="flex gap-2 flex-wrap justify-center">
                {Array.from({ length: currentPuzzle.size }, (_, i) => i + 1).map(num => (
                    <motion.button
                        key={num}
                        className="number-button"
                        onClick={() => handleNumberClick(num)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        style={{
                            backgroundColor: currentValue === num ? '#6366f1' : undefined,
                        }}
                    >
                        {num}
                    </motion.button>
                ))}

                <motion.button
                    className="w-12 h-12 rounded-lg font-bold text-lg transition-all duration-200 
                     hover:scale-110 active:scale-95 cursor-pointer
                     bg-error hover:bg-red-600 text-white"
                    onClick={handleClear}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                >
                    ✕
                </motion.button>
            </div>

            <div className="w-full text-center text-xs text-gray-500 mt-2">
                Click the same number again to clear, or press ✕
            </div>
        </motion.div>
    );
};

export default NumberSelector;
