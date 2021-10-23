import { assertEquals } from "https://deno.land/std@0.112.0/testing/asserts.ts";
import { getEnabledParts, runAndTime } from "../../utils/utils.ts";

const [partOneEnabled, partTwoEnabled, testsEnabled] = getEnabledParts()
const input = await Deno.readTextFile(Deno.args[1])

const M = 1000;

const partOne = (i: string): number => {
    return i.split('\n').reduce((g, ins) => {
        const [_, op, xs, ys, xe, ye] = (ins.match(/(turn off|turn on|toggle) (\d+),(\d+) \w+ (\d+),(\d+)/))!
        for (let j = +xs; j <= +xe; j++) {
            for (let k = +ys; k <= +ye; k++) {
                if (op === 'turn on') g[k][j] = 1
                else if (op === 'turn off') g[k][j] = 0
                else g[k][j] ^= 1
            }
        }
        return g
    }, Array.from(Array(M), () => Array(M).fill(0))).reduce((s, l) => s + l.filter((l: number) => l).length, 0)
}

const partTwo = (i: string): number => {
    return i.split('\n').reduce((g, ins) => {
        const [_, op, xs, ys, xe, ye] = (ins.match(/(turn off|turn on|toggle) (\d+),(\d+) \w+ (\d+),(\d+)/))!
        for (let j = +xs; j <= +xe; j++) {
            for (let k = +ys; k <= +ye; k++) {
                if (op === 'turn on') g[k][j] += 1
                else if (op === 'turn off') g[k][j] -= g[k][j] > 0 ? 1 : 0
                else g[k][j] += 2
            }
        }
        return g
    }, Array.from(Array(M), () => Array(M).fill(0))).reduce((s, l) => s + l.reduce((t, v) => t + v, 0), 0)
}

// --- Tests

partOneEnabled && testsEnabled && (() => {
    assertEquals(partOne('turn on 0,0 through 999,999'), M * M)
    assertEquals(partOne('toggle 0,0 through 999,0'), 0)
    assertEquals(partOne('turn off 499,499 through 500,500'), 0)
    assertEquals(partOne('turn on 0,0 through 999,999\ntoggle 0,0 through 999,0'), 0)
    assertEquals(partOne('toggle 499,499 through 500,500'), 4)
})()

partTwoEnabled && testsEnabled && (() => {
    assertEquals(partTwo('turn on 0,0 through 0,0'), 1)
    assertEquals(partTwo('toggle 0,0 through 999,999'), 2000000)
})()

// --- End Tests

partOneEnabled && runAndTime('partOne', () => partOne(input))
partTwoEnabled && runAndTime('partTwo', () => partTwo(input))