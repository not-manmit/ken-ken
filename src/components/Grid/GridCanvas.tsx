import React from 'react';
import { useGameStore } from '@/stores/gameStore';
import Cell from './Cell';
import { motion } from 'framer-motion';

const GridCanvas: React.FC = () => {
    const {
        currentPuzzle,
        playerGrid,
        selectedCell,
        selectCell,
    } = useGameStore();

    if (!currentPuzzle) {
        return (
            <div className="flex items-center justify-center h-96">
                <p className="text-gray-400 text-xl">Loading puzzle...</p>
            </div>
        );
    }

    const gridSize = currentPuzzle.size;

    // Find cage for a specific cell
    const getCageForCell = (row: number, col: number) => {
        return currentPuzzle.cages.find(cage =>
            cage.cells.some(([r, c]) => r === row && c === col)
        ) || null;
    };

    // Check if cell should be displayed (for fog mode)
    const isCellVisible = (row: number, col: number) => {
        if (!currentPuzzle.fogMode) return true;
        const cage = getCageForCell(row, col);
        return cage?.unlocked || false;
    };

    return (
        <div className="flex flex-col items-center justify-center p-8">
            <motion.div
                className="grid gap-0 bg-gray-900 p-4 rounded-xl shadow-2xl"
                style={{
                    gridTemplateColumns: `repeat(${gridSize}, minmax(60px, 1fr))`,
                    maxWidth: '600px',
                    width: 'fit-content',
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                {Array.from({ length: gridSize }).map((_, row) =>
                    Array.from({ length: gridSize }).map((_, col) => {
                        const cage = getCageForCell(row, col);
                        const isVisible = isCellVisible(row, col);
                        const isSelected = selectedCell?.[0] === row && selectedCell?.[1] === col;
                        const value = playerGrid[row]?.[col] ?? null;

                        if (!isVisible) {
                            return (
                                <div
                                    key={`${row}-${col}`}
                                    className="bg-gray-900 opacity-50 border border-gray-800"
                                    style={{ aspectRatio: '1/1', minWidth: '60px', minHeight: '60px' }}
                                />
                            );
                        }

                        return (
                            <Cell
                                key={`${row}-${col}`}
                                row={row}
                                col={col}
                                value={value}
                                isSelected={isSelected}
                                isHighlighted={false}
                                isError={false}
                                cage={cage}
                                isLocked={false}
                                onClick={() => selectCell(row, col)}
                            />
                        );
                    })
                )}
            </motion.div>
        </div>
    );
};

export default GridCanvas;
