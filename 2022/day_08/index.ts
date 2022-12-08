import {assertEquals} from "https://deno.land/std@0.112.0/testing/asserts.ts";
import {getEnabledParts, getInput, runAndTime} from "../../utils/utils.ts";

const [partOneEnabled, partTwoEnabled, testsEnabled] = getEnabledParts()
const [input, input2] = await getInput()

const partOne = (i: string): number => {
    const grid = i.split("\n").map(x => x.split("").map(Number));

    let total = grid.length * 4 - 4
    for (let j = 1; j < grid.length - 1; j++) {
        for (let k = 1; k < grid[j].length - 1; k++) {
            const isVisibleFromLeft = grid[j].slice(0, k).every(x => x < grid[j][k]);
            const isVisibleFromRight = grid[j].slice(k + 1).every(x => x < grid[j][k]);
            const isVisibleFromTop = grid.slice(0, j).map(x => x[k]).every(x => x < grid[j][k]);
            const isVisibleFromBottom = grid.slice(j + 1).map(x => x[k]).every(x => x < grid[j][k]);
            if (isVisibleFromLeft || isVisibleFromRight || isVisibleFromTop || isVisibleFromBottom) total++
        }
    }

    return total
}
const partTwo = (i: string): number => {
    const grid = i.split("\n").map(x => x.split("").map(Number));

    const totals = []
    for (let j = 1; j < grid.length - 1; j++) {
        for (let k = 1; k < grid[j].length - 1; k++) {
            const distances = [
                grid[j].slice(0, k),
                grid[j].slice(k + 1),
                grid.slice(0, j).map(x => x[k]),
                grid.slice(j + 1).map(x => x[k])
            ]

            if (distances.some(x => x.every(y => y < grid[j][k]))) {
                distances[0].reverse();
                distances[2].reverse();

                totals.push(distances.map((d) => {
                    let n = 0
                    for (const t of d) {
                        n++
                        if (t >= grid[j][k]) break;
                    }
                    return n
                }).reduce((a, b) => a * b, 1))
            }
        }
    }

    return totals.sort((a, b) => b - a)[0]
}

// --- Tests

const testInput = "30373\n" +
    "25512\n" +
    "65332\n" +
    "33549\n" +
    "35390"

partOneEnabled && testsEnabled && (() => {
    assertEquals(partOne(testInput), 21)
})()

partTwoEnabled && testsEnabled && (() => {
    assertEquals(partTwo(testInput), 8)
})()

// --- End Tests

partOneEnabled && runAndTime('partOne', () => partOne(input))
partTwoEnabled && runAndTime('partTwo', () => partTwo(input2))