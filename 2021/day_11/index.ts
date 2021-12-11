import { assertEquals } from "https://deno.land/std@0.112.0/testing/asserts.ts";
import { getEnabledParts, getInput, range, runAndTime } from "../../utils/utils.ts";

const [partOneEnabled, partTwoEnabled, testsEnabled] = getEnabledParts()
const [input, input2] = await getInput()

const partOne = (i: string, steps: number = 100): number => {
    const m = i.split("\n").map(l => l.split("").map(Number))
    let f: number = 0

    const countFlash = (x: number, y: number) => {
        if (x < 0 || y < 0 || x >= m.length || y >= m[0].length) return
        m[x][y]++
        if (m[x][y] == 10) {
            f++;

            countFlash(x, y - 1);
            countFlash(x, y + 1);
            countFlash(x - 1, y);
            countFlash(x + 1, y);
            countFlash(x - 1, y - 1);
            countFlash(x - 1, y + 1);
            countFlash(x + 1, y - 1);
            countFlash(x + 1, y + 1);
        }
    }

    for (let x = 0; x < steps; x++) {
        for (let j = 0; j < 10; j++) {
            for (let k = 0; k < 10; k++) {
                countFlash(j, k)
            }
        }

        let allFlash = true
        for (let y = 0; y < 10; y++) {
            for (let x = 0; x < 10; x++) {
                if (m[x][y] > 9) {
                    m[x][y] = 0;
                } else {
                    allFlash = false;
                }
            }
        }

        if (allFlash) return x + 1
    }

    return f
}
const partTwo = (i: string): number => {
    return partOne(i, 500)
}

// --- Tests

partOneEnabled && testsEnabled && (() => {
    assertEquals(partOne('5483143223\n' +
        '2745854711\n' +
        '5264556173\n' +
        '6141336146\n' +
        '6357385478\n' +
        '4167524645\n' +
        '2176841721\n' +
        '6882881134\n' +
        '4846848554\n' +
        '5283751526', 10), 204)
    assertEquals(partOne('5483143223\n' +
        '2745854711\n' +
        '5264556173\n' +
        '6141336146\n' +
        '6357385478\n' +
        '4167524645\n' +
        '2176841721\n' +
        '6882881134\n' +
        '4846848554\n' +
        '5283751526'), 1656)
})()

partTwoEnabled && testsEnabled && (() => {
    assertEquals(partTwo('5483143223\n' +
        '2745854711\n' +
        '5264556173\n' +
        '6141336146\n' +
        '6357385478\n' +
        '4167524645\n' +
        '2176841721\n' +
        '6882881134\n' +
        '4846848554\n' +
        '5283751526'), 195)
})()

// --- End Tests

partOneEnabled && runAndTime('partOne', () => partOne(input))
partTwoEnabled && runAndTime('partTwo', () => partTwo(input2))