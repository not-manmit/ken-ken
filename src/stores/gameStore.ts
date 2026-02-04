import { create } from 'zustand';
import { GameState, Puzzle, GameHistory } from '@/types/game.types';
import { initializePowerUps } from '@/utils/powerUps';
import { validateCell, isCageComplete, isPuzzleComplete } from '@/engine/validator';

interface GameStore extends GameState {
    // Actions
    initializeGame: (puzzle: Puzzle) => void;
    setCellValue: (row: number, col: number, value: number | null) => void;
    selectCell: (row: number, col: number) => void;
    usePowerUp: (powerUpType: string) => void;
    addStars: (amount: number) => void;
    spendStars: (amount: number) => boolean;
    undo: () => void;
    validatePuzzle: () => boolean;
    resetGame: () => void;
    updateElapsedTime: () => void;
    unlockAdjacentCages: (completedCageId: string) => void;
    incrementCombo: () => void;
    resetCombo: () => void;
}

export const useGameStore = create<GameStore>((set, get) => ({
    // Initial state
    currentPuzzle: null,
    playerGrid: [],
    selectedCell: null,
    stars: 0,
    totalStars: 0,
    powerUps: initializePowerUps(),
    mistakes: 0,
    hintsUsed: 0,
    startTime: 0,
    elapsedTime: 0,
    cascadeProgress: 0,
    level: 1,
    currentDifficulty: 1,
    combo: 0,
    history: [],
    completedPuzzles: [],

    // Initialize game with a new puzzle
    initializeGame: (puzzle: Puzzle) => {
        const emptyGrid = Array(puzzle.size)
            .fill(null)
            .map(() => Array(puzzle.size).fill(null));

        // Unlock initial cages (corner region for cascade mode)
        const updatedCages = puzzle.cages.map((cage, index) => ({
            ...cage,
            unlocked: index < 2 || !puzzle.fogMode, // Unlock first 2 cages in fog mode
        }));

        set({
            currentPuzzle: { ...puzzle, cages: updatedCages },
            playerGrid: emptyGrid,
            selectedCell: null,
            mistakes: 0,
            hintsUsed: 0,
            startTime: Date.now(),
            elapsedTime: 0,
            combo: 0,
            history: [],
            cascadeProgress: puzzle.fogMode ? 10 : 100,
        });
    },

    // Set value in a cell
    setCellValue: (row: number, col: number, value: number | null) => {
        const state = get();
        if (!state.currentPuzzle) return;

        const newGrid = state.playerGrid.map(r => [...r]);
        const oldValue = newGrid[row][col];
        newGrid[row][col] = value;

        // Validate the cell
        const isValid = value !== null ? validateCell(
            newGrid,
            state.currentPuzzle,
            row,
            col,
            value
        ) : true;

        // Add to history
        const historyEntry: GameHistory = {
            row,
            col,
            previousValue: oldValue,
            newValue: value,
            timestamp: Date.now(),
        };

        // Check if cage is complete
        let updatedCages = state.currentPuzzle.cages;
        const cage = state.currentPuzzle.cages.find(c =>
            c.cells.some(([r, c]) => r === row && c === col)
        );

        if (cage && isCageComplete(newGrid, cage)) {
            const cageIsCorrect = validateCageAgainstSolution(
                newGrid,
                cage,
                state.currentPuzzle.solution
            );

            if (cageIsCorrect) {
                // Mark cage as completed
                updatedCages = updatedCages.map(c =>
                    c.id === cage.id ? { ...c, completed: true, perfect: state.mistakes === 0 } : c
                );

                // Award stars for perfect cage
                const starsEarned = state.mistakes === 0 ? 3 : 1;
                get().addStars(starsEarned);
                get().incrementCombo();

                // Unlock adjacent cages in cascade mode
                if (state.currentPuzzle.fogMode) {
                    get().unlockAdjacentCages(cage.id);
                }
            }
        }

        set({
            playerGrid: newGrid,
            history: [...state.history, historyEntry],
            mistakes: !isValid && value !== null ? state.mistakes + 1 : state.mistakes,
            currentPuzzle: { ...state.currentPuzzle, cages: updatedCages },
        });

        // Check if puzzle is complete
        if (isPuzzleComplete(newGrid, state.currentPuzzle)) {
            console.log('Puzzle completed!');
            // Add puzzle to completed list
            set({
                completedPuzzles: [...state.completedPuzzles, state.currentPuzzle.id],
            });
        }
    },

    // Select a cell
    selectCell: (row: number, col: number) => {
        set({ selectedCell: [row, col] });
    },

    // Use a power-up
    usePowerUp: (powerUpType: string) => {
        const state = get();
        const powerUp = state.powerUps.find(p => p.type === powerUpType);

        if (!powerUp || !powerUp.available) return;

        if (state.stars >= powerUp.cost) {
            get().spendStars(powerUp.cost);

            // Activate power-up
            const updatedPowerUps = state.powerUps.map(p =>
                p.type === powerUpType
                    ? {
                        ...p,
                        active: true,
                        expiresAt: powerUpType === 'undoPlus' ? Date.now() + 120000 : undefined,
                    }
                    : p
            );

            set({ powerUps: updatedPowerUps });

            // Execute power-up effect
            switch (powerUpType) {
                case 'smartHint':
                    // Logic handled in component
                    break;
                case 'cageValidator':
                    // Logic handled in component
                    break;
                case 'undoPlus':
                    // Activated for 2 minutes
                    break;
                case 'revealRegion':
                    // Logic handled in component
                    break;
            }
        }
    },

    // Add stars
    addStars: (amount: number) => {
        set(state => ({
            stars: state.stars + amount,
            totalStars: state.totalStars + amount,
        }));
    },

    // Spend stars
    spendStars: (amount: number) => {
        const state = get();
        if (state.stars >= amount) {
            set({ stars: state.stars - amount });
            return true;
        }
        return false;
    },

    // Undo last move
    undo: () => {
        const state = get();
        if (state.history.length === 0) return;

        const lastMove = state.history[state.history.length - 1];
        const newGrid = state.playerGrid.map(r => [...r]);
        newGrid[lastMove.row][lastMove.col] = lastMove.previousValue;

        set({
            playerGrid: newGrid,
            history: state.history.slice(0, -1),
        });
    },

    // Validate entire puzzle
    validatePuzzle: () => {
        const state = get();
        if (!state.currentPuzzle) return false;
        return isPuzzleComplete(state.playerGrid, state.currentPuzzle);
    },

    // Reset game
    resetGame: () => {
        const state = get();
        if (state.currentPuzzle) {
            get().initializeGame(state.currentPuzzle);
        }
    },

    // Update elapsed time
    updateElapsedTime: () => {
        const state = get();
        if (state.startTime > 0) {
            set({ elapsedTime: Date.now() - state.startTime });
        }
    },

    // Unlock adjacent cages (cascade mode)
    unlockAdjacentCages: (completedCageId: string) => {
        const state = get();
        if (!state.currentPuzzle) return;

        const completedCage = state.currentPuzzle.cages.find(c => c.id === completedCageId);
        if (!completedCage) return;

        const adjacentCells = new Set<string>();
        completedCage.cells.forEach(([row, col]) => {
            // Add all adjacent cells
            [
                [row - 1, col],
                [row + 1, col],
                [row, col - 1],
                [row, col + 1],
            ].forEach(([r, c]) => {
                if (r >= 0 && r < state.currentPuzzle!.size && c >= 0 && c < state.currentPuzzle!.size) {
                    adjacentCells.add(`${r},${c}`);
                }
            });
        });

        const updatedCages = state.currentPuzzle.cages.map(cage => {
            if (cage.unlocked) return cage;

            const hasAdjacentCell = cage.cells.some(([r, c]) => adjacentCells.has(`${r},${c}`));
            return hasAdjacentCell ? { ...cage, unlocked: true } : cage;
        });

        const unlockedCount = updatedCages.filter(c => c.unlocked).length;
        const progress = (unlockedCount / updatedCages.length) * 100;

        set({
            currentPuzzle: { ...state.currentPuzzle, cages: updatedCages },
            cascadeProgress: progress,
        });
    },

    // Increment combo counter
    incrementCombo: () => {
        set(state => ({ combo: state.combo + 1 }));
    },

    // Reset combo counter
    resetCombo: () => {
        set({ combo: 0 });
    },
}));

// Helper function to validate cage against solution
function validateCageAgainstSolution(
    grid: (number | null)[][],
    cage: { cells: [number, number][] },
    solution: number[][]
): boolean {
    return cage.cells.every(([row, col]) => {
        const playerValue = grid[row][col];
        const solutionValue = solution[row][col];
        return playerValue === solutionValue;
    });
}
