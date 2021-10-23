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

const testPartOne = <T>(cb: (input: string) => T) => {
    assertEquals(M * M, cb('turn on 0,0 through 999,999'))
    assertEquals(0, cb('toggle 0,0 through 999,0'))
    assertEquals(0, cb('turn off 499,499 through 500,500'))
    assertEquals(0, cb('turn on 0,0 through 999,999\ntoggle 0,0 through 999,0'))
    assertEquals(4, cb('toggle 499,499 through 500,500'))
}

const testPartTwo = <T>(cb: (input: string) => T) => {
    assertEquals(1, cb('turn on 0,0 through 0,0'))
    assertEquals(2000000, cb('toggle 0,0 through 999,999'))
}

partOneEnabled && testsEnabled && testPartOne((i) => partOne(i))
partTwoEnabled && testsEnabled && testPartTwo((i) => partTwo(i))

// --- End Tests

partOneEnabled && runAndTime('partOne', () => partOne(input))
partTwoEnabled && runAndTime('partTwo', () => partTwo(input))