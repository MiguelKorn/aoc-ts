// ----- Start Helper Methods -----
type EnabledPartsReturn = [partOneEnabled: boolean, partTwoEnabled: boolean, testsEnabled: boolean]
export const getEnabledParts = (): EnabledPartsReturn => ([
    Deno.args.includes('-p1'),
    Deno.args.includes('-p2'),
    Deno.args.includes('-t')
])

export const runAndTime = <T = unknown>(label: string, cb: () => T): T => {
    console.time(label)
    const result = cb();
    console.timeEnd(label)
    console.log(`Solution to ${label}: ${result}`)
    return result
}

export const getInput = async () => {
    const i = await Deno.readTextFile(Deno.args[1])
    return [i, Deno.args.includes('-i2') ? await Deno.readTextFile(Deno.args[3]) : i]
}
// ----- End Helper Methods -----

export const getGreatestCommonDivisor = (a: number, b: number): number => !b ? a : getGreatestCommonDivisor(b, a % b)

export const getLeastCommonMultiple = (numbers: Array<number>): number => {
    const lcm = (a: number, b:number) => (a * b) / getGreatestCommonDivisor(a, b)
    return numbers.reduce((a, b) => lcm(a, b))
}

export const createGrid = (rows: number, cols: number = rows, fill: any = 0) => Array(cols).fill(null).map(() => Array(rows).fill(fill))

export const range = (start: number, end: number): Array<number> => Array.from({ length: end - start }, (_, i) => start + i)

// https://www.baeldung.com/cs/array-generate-all-permutations#quickperm-algorithm
type CreatePermutations<T = string | number> = (arr: T[], partial?: boolean) => T[][]
export const createPermutations: CreatePermutations = (arr, partial = false) => {
    const permutations = [[...arr]]
    const N = arr.length - (partial ? 1 : 0);
    const currentPerm: number[] = [...Array(N + 1).keys()]

    let i = 1;
    while (i < N) {
        currentPerm[i] -= 1;
        const j = (i % 2 == 1) ? currentPerm[i] : 0;
        [arr[j], arr[i]] = [arr[i], arr[j]] // swap
        permutations.push([...arr])
        i = 1
        while (currentPerm[i] == 0) {
            currentPerm[i] = i++;
        }
    }

    return permutations;
}

/**
 * Floodfill algorithm
 * Returns amount of adjacent cells
 * @param x row position
 * @param y column position
 * @param grid grid to search
 * @param marker marker to mark done cells
 * @param low lowest number to stop at
 * @param high highest number to stop at
 */
export const floodFill = (x: number, y: number, grid: number[][], marker: number, low: number = -1, high: number = marker): number => {
    if (x < 0 || x >= grid.length || y < 0 || y >= grid[0].length || grid[x][y] === high || grid[x][y] === low) {
        return 0
    }
    grid[x][y] = marker
    return 1 + [
        floodFill(x - 1, y, grid, marker, high, low),
        floodFill(x + 1, y, grid, marker, high, low),
        floodFill(x, y - 1, grid, marker, high, low),
        floodFill(x, y + 1, grid, marker, high, low)
    ].reduce((a, b) => a + b, 0)
}

export const pairWise = <T>(array: T[], cb: (a: T, b: T, i: number) => any, skips = 1) => {
    const result = []
    for (let i = 0; i < array.length - skips; i++) {
        result.push(cb(array[i], array[i + skips], i))
    }
    return result
}

export function* subsetSum(numbers: number[], target: number, length: number = -1, partial: number[] = [], partialSum: number = 0): IterableIterator<number[]> {
    if (partialSum === target && (length === -1 ? true : partial.length === length)) yield partial;
    if (partialSum >= target || (length !== -1 && partial.length >= length)) return;
    for (const [i, n] of numbers.entries()) {
        yield* subsetSum(numbers.slice(i + 1), target, length, partial.concat(n), partialSum + n)
    }
}

export const getNeighbours = <T>(grid: T[][], x: number, y: number, diagonal = false, side = true): T[] => {
    const neighbours = []
    const sides = [[0, -1], [1, 0], [0, 1], [-1, 0],]
    const diagonals = [[1, -1], [1, 1], [-1, 1], [-1, -1]]
    const both = [[-1, -1], [0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0]]
    const directions = diagonal ? side ? both : diagonals : sides
    for (const [dx, dy] of directions) {
        const nx = x + dx
        const ny = y + dy
        if (nx >= 0 && nx < grid[0].length && ny >= 0 && ny < grid.length) {
            neighbours.push(grid[ny][nx])
        }
    }
    return neighbours
}