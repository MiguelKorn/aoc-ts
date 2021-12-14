import { assertEquals } from "https://deno.land/std@0.112.0/testing/asserts.ts";
import { createGrid, getEnabledParts, getInput, getNeighbours, runAndTime } from "../../utils/utils.ts";

const [partOneEnabled, partTwoEnabled, testsEnabled] = getEnabledParts()
const [input, input2] = await getInput()

const partOne = (i: string, steps: number = 100, p2 = false): number => {
    let grid = i.split("\n").map(l => l.split(""))

    for (let j = 0; j < steps; j++) {
        const newGrid = createGrid(grid[0].length, grid.length, ".")
        for (let y = 0; y < grid.length; y++) {
            for (let x = 0; x < grid[y].length; x++) {
                const neighbours = getNeighbours(grid, x, y, true)
                const turnOn = grid[y][x] === "." && neighbours.filter(n => n === "#").length === 3
                const staysOn = grid[y][x] === "#" && [2, 3].includes(neighbours.filter(n => n === "#").length)
                const isCorner = [0, grid.length-1].includes(x) && [0, grid.length-1].includes(y)
                if ((p2 && isCorner) || turnOn || staysOn) newGrid[y][x] = "#"
            }
        }
        grid = newGrid
    }

    return grid.reduce((acc, row) => acc + row.filter(c => c === "#").length, 0)
}
const partTwo = (i: string): number => {
    return partOne(i, 100, true)
}

// --- Tests

partOneEnabled && testsEnabled && (() => {
    assertEquals(partOne('.#.#.#\n' +
        '...##.\n' +
        '#....#\n' +
        '..#...\n' +
        '#.#..#\n' +
        '####..', 4), 4)
})()

partTwoEnabled && testsEnabled && (() => {
    assertEquals(partOne('##.#.#\n' +
        '...##.\n' +
        '#....#\n' +
        '..#...\n' +
        '#.#..#\n' +
        '####.#', 5, true), 17)
})()

// --- End Tests

partOneEnabled && runAndTime('partOne', () => partOne(input))
partTwoEnabled && runAndTime('partTwo', () => partTwo(input2))