import { assertEquals } from "https://deno.land/std@0.112.0/testing/asserts.ts";
import { getEnabledParts, runAndTime } from "../../utils/utils.ts";

const [partOneEnabled, partTwoEnabled, testsEnabled] = getEnabledParts()
const input = await Deno.readTextFile(Deno.args[1])

const n = Number;
const m = Math.min;

const partOne = (input: string): number => {
    return input.split('\n').map(r => {
        const s = r.split('x').map((v, i, a) => n(v) * n(a[i == 2 ? 0 : i + 1]))
        return s.reduce((v, n) => v + (2 * n), m(...s))
    }).reduce((v, n) => v + n, 0)
}
const partTwo = (input: string): number => {
    return input.split('\n').map(r => {
        const [l, w, h] = r.split('x').map(n).sort((a, b) => a - b)
        return 2 * l + 2 * w + l * w * h
    }).reduce((v, n) => v + n, 0)
}

// --- Tests

const testPartOne = <T>(cb: (input: string) => T) => {
    assertEquals(58, cb('2x3x4'))
    assertEquals(43, cb('1x1x10'))
}

const testPartTwo = <T>(cb: (input: string) => T) => {
    assertEquals(34, cb('2x3x4'))
    assertEquals(14, cb('1x1x10'))
}

partOneEnabled && testsEnabled && testPartOne((i) => partOne(i))
partTwoEnabled && testsEnabled && testPartTwo((i) => partTwo(i))

// --- End Tests

partOneEnabled && runAndTime('partOne', () => partOne(input))
partTwoEnabled && runAndTime('partTwo', () => partTwo(input))