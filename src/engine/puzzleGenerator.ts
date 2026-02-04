import { Puzzle, GridSize, Cage, Operation } from '@/types/game.types';

/**
 * Generate a simple unique ID
 */
function generateId(): string {
    return `puzzle-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Generates a random valid KenKen puzzle
 * Uses backtracking algorithm to create a valid Latin square solution
 */
export function generatePuzzle(size: GridSize, difficulty: number, fogMode: boolean = false): Puzzle {
    // Generate a valid solution grid
    const solution = generateLatinSquare(size);

    // Generate cages based on difficulty
    const cages = generateCages(solution, difficulty);

    return {
        id: generateId(),
        size,
        cages,
        solution,
        difficulty,
        fogMode,
    };
}

/**
 * Generates a valid Latin square (solution grid)
 */
function generateLatinSquare(size: number): number[][] {
    const grid: number[][] = Array(size)
        .fill(0)
        .map(() => Array(size).fill(0));

    // Start with a base pattern and shuffle
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            grid[i][j] = ((i + j) % size) + 1;
        }
    }

    // Shuffle rows and columns to randomize
    shuffleRows(grid);
    shuffleColumns(grid);

    return grid;
}

/**
 * Shuffles rows of the grid
 */
function shuffleRows(grid: number[][]): void {
    for (let i = grid.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [grid[i], grid[j]] = [grid[j], grid[i]];
    }
}

/**
 * Shuffles columns of the grid
 */
function shuffleColumns(grid: number[][]): void {
    const size = grid.length;
    for (let i = size - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        for (let row = 0; row < size; row++) {
            [grid[row][i], grid[row][j]] = [grid[row][j], grid[row][i]];
        }
    }
}

/**
 * Generates cages for the puzzle
 */
function generateCages(solution: number[][], difficulty: number): Cage[] {
    const size = solution.length;
    const visited: boolean[][] = Array(size)
        .fill(false)
        .map(() => Array(size).fill(false));

    const cages: Cage[] = [];
    let cageIndex = 0;

    // Determine cage size based on difficulty (easier = larger cages)
    const maxCageSize = difficulty < 3 ? 3 : difficulty < 6 ? 4 : 5;
    const minCageSize = difficulty < 3 ? 2 : 1;

    for (let row = 0; row < size; row++) {
        for (let col = 0; col < size; col++) {
            if (!visited[row][col]) {
                const cageSize = Math.floor(Math.random() * (maxCageSize - minCageSize + 1)) + minCageSize;
                const cells = growCage(row, col, cageSize, visited, size);

                const cage = createCageFromCells(cells, solution, cageIndex);
                cages.push(cage);
                cageIndex++;
            }
        }
    }

    return cages;
}

/**
 * Grows a cage from a starting cell
 */
function growCage(
    startRow: number,
    startCol: number,
    targetSize: number,
    visited: boolean[][],
    gridSize: number
): [number, number][] {
    const cells: [number, number][] = [[startRow, startCol]];
    visited[startRow][startCol] = true;

    while (cells.length < targetSize) {
        const candidates: [number, number][] = [];

        // Find adjacent unvisited cells
        for (const [row, col] of cells) {
            const adjacent: [number, number][] = [
                [row - 1, col],
                [row + 1, col],
                [row, col - 1],
                [row, col + 1],
            ];

            for (const [r, c] of adjacent) {
                if (
                    r >= 0 &&
                    r < gridSize &&
                    c >= 0 &&
                    c < gridSize &&
                    !visited[r][c] &&
                    !candidates.some(([cr, cc]) => cr === r && cc === c)
                ) {
                    candidates.push([r, c]);
                }
            }
        }

        if (candidates.length === 0) break;

        // Pick a random candidate
        const [newRow, newCol] = candidates[Math.floor(Math.random() * candidates.length)];
        cells.push([newRow, newCol]);
        visited[newRow][newCol] = true;
    }

    return cells;
}

/**
 * Creates a cage with operation and target from cells
 */
function createCageFromCells(
    cells: [number, number][],
    solution: number[][],
    index: number
): Cage {
    const values = cells.map(([row, col]) => solution[row][col]);

    let operation: Operation;
    let target: number;

    if (cells.length === 1) {
        // Single cell cage
        operation = '=';
        target = values[0];
    } else {
        // Choose random operation
        const operations: Operation[] = ['+', '-', '×', '÷'];
        operation = operations[Math.floor(Math.random() * operations.length)];

        // Calculate target based on operation
        switch (operation) {
            case '+':
                target = values.reduce((sum, val) => sum + val, 0);
                break;

            case '×':
                target = values.reduce((product, val) => product * val, 1);
                break;

            case '-':
                if (values.length === 2) {
                    target = Math.abs(values[0] - values[1]);
                } else {
                    // Fallback to addition for multi-cell
                    operation = '+';
                    target = values.reduce((sum, val) => sum + val, 0);
                }
                break;

            case '÷':
                if (values.length === 2) {
                    const sorted = [...values].sort((a, b) => b - a);
                    if (sorted[0] % sorted[1] === 0) {
                        target = sorted[0] / sorted[1];
                    } else {
                        // Fallback to addition
                        operation = '+';
                        target = values.reduce((sum, val) => sum + val, 0);
                    }
                } else {
                    // Fallback to addition
                    operation = '+';
                    target = values.reduce((sum, val) => sum + val, 0);
                }
                break;

            default:
                operation = '+';
                target = values.reduce((sum, val) => sum + val, 0);
        }
    }

    return {
        id: `cage-${index}`,
        cells,
        target,
        operation,
        unlocked: false,
        completed: false,
        perfect: false,
    };
}

/**
 * Pre-generated puzzles for immediate play
 */
export const samplePuzzles: Puzzle[] = [
    // 4x4 Easy puzzle
    {
        id: 'sample-4x4-easy',
        size: 4,
        difficulty: 2,
        fogMode: false,
        solution: [
            [1, 2, 3, 4],
            [3, 4, 1, 2],
            [2, 3, 4, 1],
            [4, 1, 2, 3],
        ],
        cages: [
            {
                id: 'cage-0',
                cells: [[0, 0], [0, 1]],
                target: 3,
                operation: '+',
                unlocked: true,
                completed: false,
            },
            {
                id: 'cage-1',
                cells: [[0, 2], [1, 2]],
                target: 4,
                operation: '+',
                unlocked: true,
                completed: false,
            },
            {
                id: 'cage-2',
                cells: [[0, 3], [1, 3]],
                target: 2,
                operation: '÷',
                unlocked: true,
                completed: false,
            },
            {
                id: 'cage-3',
                cells: [[1, 0], [2, 0]],
                target: 5,
                operation: '+',
                unlocked: true,
                completed: false,
            },
            {
                id: 'cage-4',
                cells: [[1, 1], [2, 1]],
                target: 12,
                operation: '×',
                unlocked: true,
                completed: false,
            },
            {
                id: 'cage-5',
                cells: [[2, 2], [2, 3]],
                target: 5,
                operation: '+',
                unlocked: true,
                completed: false,
            },
            {
                id: 'cage-6',
                cells: [[3, 0], [3, 1]],
                target: 5,
                operation: '+',
                unlocked: true,
                completed: false,
            },
            {
                id: 'cage-7',
                cells: [[3, 2], [3, 3]],
                target: 5,
                operation: '+',
                unlocked: true,
                completed: false,
            },
        ],
    },
];
