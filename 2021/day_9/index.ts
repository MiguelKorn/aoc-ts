import { assertEquals } from "https://deno.land/std@0.112.0/testing/asserts.ts";
import { floodfill, getEnabledParts, getInput, runAndTime } from "../../utils/utils.ts";

const [partOneEnabled, partTwoEnabled, testsEnabled] = getEnabledParts()
const [input, input2] = await getInput()

const lowerThanNeighbors = (x: number, y: number, grid: number[][]) => {
    const neighbors: { [key: string]: number[] } = {
        t: [x - 1, y],
        b: [x + 1, y],
        l: [x, y - 1],
        r: [x, y + 1],
    }

    if (x === 0) delete neighbors.t
    if (x === grid.length) delete neighbors.b
    if (y === 0) delete neighbors.l
    if (y === grid[0].length - 1) delete neighbors.r

    if(Object.values(neighbors).length === 0) return false
    return Object.values(neighbors).every(([nx, ny]) => grid[nx][ny] > grid[x][y])
}

const partOne = (i: string): number => {
    const m = i.split('\n').map(l => l.split('').map(Number))
    let p: number[] = [];
    m.forEach((row, x) => {
            row.forEach((n, y) => {
                if (lowerThanNeighbors(x, y, m)) p.push(n)
            })
        }
    )
    return p.reduce((a, b) => a + (b + 1), 0)
}
const partTwo = (i: string): number => {
    const m = i.split('\n').map(l => l.split('').map(Number))
    let b: number[] = []

    m.forEach((row, x) => {
        row.forEach((col, y) => {
            b.push(floodfill(x, y, m, 9))
        })
    })

    return b.sort((a, b) => b - a).slice(0, 3).reduce((a, b) => a * b, 1)
}

// --- Tests

partOneEnabled && testsEnabled && (() => {
    assertEquals(partOne('2199943210\n' +
        '3987894921\n' +
        '9856789892\n' +
        '8767896789\n' +
        '9899965678'), 15)
})()

partTwoEnabled && testsEnabled && (() => {
    assertEquals(partTwo('2199943210\n' +
        '3987894921\n' +
        '9856789892\n' +
        '8767896789\n' +
        '9899965678'), 1134)
})()

// --- End Tests

partOneEnabled && runAndTime('partOne', () => partOne(input))
partTwoEnabled && runAndTime('partTwo', () => partTwo(input2))