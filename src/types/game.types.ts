// Core game types following the design document

export type Operation = '+' | '-' | '×' | '÷' | '=';
export type GridSize = 4 | 5 | 6 | 7;
export type PowerUpType = 'smartHint' | 'cageValidator' | 'undoPlus' | 'revealRegion';
export type GameMode = 'normal' | 'fogOfWar' | 'timeAttack' | 'minimalMoves' | 'dailyForge';

export interface Cage {
    id: string;
    cells: [row: number, col: number][];
    target: number;
    operation: Operation;
    unlocked: boolean; // Cascade feature
    completed?: boolean;
    perfect?: boolean; // No mistakes in this cage
}

export interface Puzzle {
    id: string;
    size: GridSize;
    cages: Cage[];
    solution: number[][];
    difficulty: number; // 1-10
    fogMode?: boolean;
    mode?: GameMode;
}

export interface PowerUp {
    type: PowerUpType;
    name: string;
    description: string;
    cost: number; // in stars
    icon: string;
    available: boolean;
    active?: boolean;
    expiresAt?: number; // timestamp for timed power-ups
}

export interface GameState {
    currentPuzzle: Puzzle | null;
    playerGrid: (number | null)[][];
    selectedCell: [row: number, col: number] | null;
    stars: number;
    totalStars: number;
    powerUps: PowerUp[];
    mistakes: number;
    hintsUsed: number;
    startTime: number;
    elapsedTime: number;
    cascadeProgress: number; // % of grid unlocked
    level: number;
    currentDifficulty: number;
    combo: number; // consecutive correct placements
    history: GameHistory[];
    completedPuzzles: string[];
}

export interface GameHistory {
    row: number;
    col: number;
    previousValue: number | null;
    newValue: number | null;
    timestamp: number;
}

export interface UserProgress {
    level: number;
    totalStars: number;
    totalPuzzlesCompleted: number;
    bestTimes: Record<GridSize, number>;
    achievements: Achievement[];
    statistics: GameStatistics;
}

export interface Achievement {
    id: string;
    name: string;
    description: string;
    unlocked: boolean;
    unlockedAt?: number;
    icon: string;
}

export interface GameStatistics {
    totalPlayTime: number;
    averageSolveTime: number;
    perfectCages: number;
    totalHintsUsed: number;
    totalMistakes: number;
    fastestSolve: number;
    longestStreak: number;
    currentStreak: number;
}

export interface CellState {
    value: number | null;
    isValid: boolean;
    isLocked: boolean;
    cage: Cage | null;
    highlighted: boolean;
    error: boolean;
}
