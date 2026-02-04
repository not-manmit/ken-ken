import { Puzzle, Cage } from '@/types/game.types';

/**
 * Validates if a number can be placed in a specific cell
 */
export function validateCell(
    grid: (number | null)[][],
    puzzle: Puzzle,
    row: number,
    col: number,
    value: number
): boolean {
    // Check row constraint
    for (let c = 0; c < grid[row].length; c++) {
        if (c !== col && grid[row][c] === value) {
            return false;
        }
    }

    // Check column constraint
    for (let r = 0; r < grid.length; r++) {
        if (r !== row && grid[r][col] === value) {
            return false;
        }
    }

    // Check if value is within valid range
    if (value < 1 || value > puzzle.size) {
        return false;
    }

    return true;
}

/**
 * Checks if a cage is completely filled
 */
export function isCageComplete(grid: (number | null)[][], cage: Cage): boolean {
    return cage.cells.every(([row, col]) => grid[row][col] !== null);
}

/**
 * Validates if a cage satisfies its operation constraint
 */
export function validateCage(grid: (number | null)[][], cage: Cage): boolean {
    if (!isCageComplete(grid, cage)) {
        return false;
    }

    const values = cage.cells.map(([row, col]) => grid[row][col] as number);

    switch (cage.operation) {
        case '=':
            return values[0] === cage.target;

        case '+':
            return values.reduce((sum, val) => sum + val, 0) === cage.target;

        case '×':
            return values.reduce((product, val) => product * val, 1) === cage.target;

        case '-':
            if (values.length !== 2) return false;
            return Math.abs(values[0] - values[1]) === cage.target;

        case '÷':
            if (values.length !== 2) return false;
            const [a, b] = values.sort((x, y) => y - x);
            return a / b === cage.target;

        default:
            return false;
    }
}

/**
 * Checks if the entire puzzle is complete and valid
 */
export function isPuzzleComplete(grid: (number | null)[][], puzzle: Puzzle): boolean {
    // Check if grid is fully filled
    const isFilled = grid.every(row => row.every(cell => cell !== null));
    if (!isFilled) return false;

    // Validate all rows and columns
    for (let i = 0; i < puzzle.size; i++) {
        const row = grid[i];
        const col = grid.map(r => r[i]);

        if (!isValidSequence(row as number[], puzzle.size)) return false;
        if (!isValidSequence(col as number[], puzzle.size)) return false;
    }

    // Validate all cages
    for (const cage of puzzle.cages) {
        if (!validateCage(grid, cage)) return false;
    }

    return true;
}

/**
 * Checks if a sequence (row or column) is valid
 */
function isValidSequence(sequence: number[], size: number): boolean {
    const seen = new Set<number>();
    for (const num of sequence) {
        if (num < 1 || num > size || seen.has(num)) {
            return false;
        }
        seen.add(num);
    }
    return seen.size === size;
}

/**
 * Gets valid numbers that can be placed in a cell
 */
export function getValidNumbers(
    grid: (number | null)[][],
    puzzle: Puzzle,
    row: number,
    col: number
): number[] {
    const validNumbers: number[] = [];

    for (let num = 1; num <= puzzle.size; num++) {
        if (validateCell(grid, puzzle, row, col, num)) {
            validNumbers.push(num);
        }
    }

    return validNumbers;
}

/**
 * Checks if a specific cell's value matches the solution
 */
export function isCorrectValue(
    grid: (number | null)[][],
    solution: number[][],
    row: number,
    col: number
): boolean {
    const playerValue = grid[row][col];
    if (playerValue === null) return false;
    return playerValue === solution[row][col];
}
