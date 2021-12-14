import { assertEquals } from "https://deno.land/std@0.112.0/testing/asserts.ts";
import { floodFill, getEnabledParts, getInput, getNeighbours, runAndTime } from "../../utils/utils.ts";

const [partOneEnabled, partTwoEnabled, testsEnabled] = getEnabledParts()
const [input, input2] = await getInput()

const partOne = (i: string): number => {
    const m = i.split('\n').map(l => l.split('').map(Number))
    let p: number[] = [];
    m.forEach((row, y) => {
            row.forEach((c, x) => {
                if (getNeighbours(m, x, y).every(n => c < n)) p.push(c)
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
            b.push(floodFill(x, y, m, 9))
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