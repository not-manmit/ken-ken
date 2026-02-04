import { PowerUp } from '@/types/game.types';

/**
 * Initialize default power-ups with their properties
 */
export function initializePowerUps(): PowerUp[] {
    return [
        {
            type: 'smartHint',
            name: 'Smart Hint',
            description: 'Highlights valid numbers for selected cell',
            cost: 5,
            icon: '💡',
            available: true,
            active: false,
        },
        {
            type: 'cageValidator',
            name: 'Cage Validator',
            description: 'Check if a cage is correctly filled',
            cost: 3,
            icon: '✓',
            available: true,
            active: false,
        },
        {
            type: 'undoPlus',
            name: 'Undo Plus',
            description: 'Unlimited undos for 2 minutes',
            cost: 2,
            icon: '↶',
            available: true,
            active: false,
        },
        {
            type: 'revealRegion',
            name: 'Reveal Region',
            description: 'Unlock a fog-covered area',
            cost: 10,
            icon: '👁',
            available: true,
            active: false,
        },
    ];
}

/**
 * Format time in MM:SS format
 */
export function formatTime(milliseconds: number): string {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

/**
 * Calculate difficulty adjustment based on performance
 */
export function calculateDifficultyAdjustment(
    completionTime: number,
    hintsUsed: number,
    perfectCages: number,
    totalCages: number
): number {
    const averageTime = 300000; // 5 minutes baseline
    const timeFactor = (completionTime - averageTime) / averageTime;
    const hintFactor = hintsUsed / 5; // Normalize by expected hints
    const perfectFactor = perfectCages / totalCages;

    const adjustment = timeFactor * 0.3 + hintFactor * 0.2 - perfectFactor * 0.4;

    return Math.max(-2, Math.min(2, adjustment)); // Clamp between -2 and +2
}

/**
 * Get cage border styles based on which edges are cage boundaries
 */
export function getCageBorders(
    row: number,
    col: number,
    cells: [number, number][]
): {
    top: boolean;
    right: boolean;
    bottom: boolean;
    left: boolean;
} {
    const cellSet = new Set(cells.map(([r, c]) => `${r},${c}`));

    return {
        top: !cellSet.has(`${row - 1},${col}`),
        right: !cellSet.has(`${row},${col + 1}`),
        bottom: !cellSet.has(`${row + 1},${col}`),
        left: !cellSet.has(`${row},${col - 1}`),
    };
}

/**
 * Generate a random color for cage highlighting
 */
export function getCageColor(cageId: string): string {
    const colors = [
        '#6366f1', // indigo
        '#8b5cf6', // purple
        '#ec4899', // pink
        '#f59e0b', // amber
        '#10b981', // emerald
        '#3b82f6', // blue
        '#f97316', // orange
        '#14b8a6', // teal
    ];

    // Use cage ID to consistently assign colors
    const hash = cageId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[hash % colors.length];
}

/**
 * Play sound effect (placeholder for actual implementation)
 */
export function playSound(soundType: 'correct' | 'error' | 'complete' | 'powerup'): void {
    // This would integrate with Howler.js in production
    console.log(`Playing sound: ${soundType}`);
}

/**
 * Calculate stars earned for completing a cage
 */
export function calculateCageStars(mistakes: number, hintsUsed: number): number {
    if (mistakes === 0 && hintsUsed === 0) return 3;
    if (mistakes <= 1) return 2;
    return 1;
}

/**
 * Get achievement based on game statistics
 */
export function checkAchievements(stats: {
    perfectCages: number;
    fastSolve: boolean;
    noHints: boolean;
    combo: number;
}): string[] {
    const achievements: string[] = [];

    if (stats.perfectCages >= 3) achievements.push('Flawless');
    if (stats.fastSolve) achievements.push('Speedster');
    if (stats.noHints) achievements.push('Independent');
    if (stats.combo >= 5) achievements.push('Combo Master');

    return achievements;
}
