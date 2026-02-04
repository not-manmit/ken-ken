import React from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { getCageBorders, getCageColor } from '@/utils/powerUps';
import { Cage } from '@/types/game.types';

interface CellProps {
    row: number;
    col: number;
    value: number | null;
    isSelected: boolean;
    isHighlighted: boolean;
    isError: boolean;
    cage: Cage | null;
    isLocked: boolean;
    onClick: () => void;
    onDoubleClick?: () => void;
}

const Cell: React.FC<CellProps> = ({
    row,
    col,
    value,
    isSelected,
    isHighlighted,
    isError,
    cage,
    isLocked,
    onClick,
    onDoubleClick,
}) => {
    const borders = cage ? getCageBorders(row, col, cage.cells) : { top: true, right: true, bottom: true, left: true };
    const cageColor = cage ? getCageColor(cage.id) : '#6366f1';

    // Show cage label on the first (top-left) cell
    const isFirstCellInCage = cage && cage.cells[0][0] === row && cage.cells[0][1] === col;

    return (
        <motion.div
            className={clsx(
                'relative bg-gray-700 cursor-pointer transition-all',
                'flex items-center justify-center text-2xl font-bold',
                'border border-gray-600',
                {
                    'bg-primary bg-opacity-30': isSelected,
                    'bg-yellow-500 bg-opacity-20': isHighlighted,
                    'bg-error bg-opacity-30 animate-shake': isError,
                    'opacity-50': isLocked,
                    'cage-border-top': borders.top,
                    'cage-border-right': borders.right,
                    'cage-border-bottom': borders.bottom,
                    'cage-border-left': borders.left,
                }
            )}
            style={{
                borderColor: cageColor,
                aspectRatio: '1/1',
                minWidth: '60px',
                minHeight: '60px',
            }}
            onClick={onClick}
            onDoubleClick={onDoubleClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={{
                scale: isSelected ? 1.08 : 1,
            }}
            transition={{ duration: 0.2 }}
        >
            {/* Cage label */}
            {isFirstCellInCage && cage && (
                <div
                    className="absolute top-0.5 left-1 text-xs font-semibold opacity-80"
                    style={{ color: cageColor }}
                >
                    {cage.target}
                    {cage.operation}
                </div>
            )}

            {/* Cell value */}
            {value !== null && (
                <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className={clsx('text-white', {
                        'text-success': cage?.completed,
                        'text-error': isError,
                    })}
                >
                    {value}
                </motion.span>
            )}

            {/* Completed cage indicator */}
            {cage?.completed && isFirstCellInCage && (
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-0 right-0 text-success text-xs"
                >
                    ✓
                </motion.div>
            )}
        </motion.div>
    );
};

export default Cell;
