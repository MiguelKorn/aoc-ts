import { assertEquals } from "https://deno.land/std@0.112.0/testing/asserts.ts";
import { getEnabledParts, getInput, runAndTime } from "../../utils/utils.ts";

const [partOneEnabled, partTwoEnabled, testsEnabled] = getEnabledParts()
const [input, input2] = await getInput()

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

partOneEnabled && testsEnabled && (() => {
    assertEquals(partOne('2x3x4'), 58)
    assertEquals(partOne('1x1x10'), 43)
})()

partTwoEnabled && testsEnabled && (() => {
    assertEquals(partTwo('2x3x4'), 34)
    assertEquals(partTwo('1x1x10'), 14)
})()

// --- End Tests

partOneEnabled && runAndTime('partOne', () => partOne(input))
partTwoEnabled && runAndTime('partTwo', () => partTwo(input2))