import { assertEquals } from "https://deno.land/std@0.112.0/testing/asserts.ts";
import { getEnabledParts, getInput, runAndTime } from "../../utils/utils.ts";

const [partOneEnabled, partTwoEnabled, testsEnabled] = getEnabledParts()
const [input, input2] = await getInput()

const partOne = (i: string): number => {
    return i.split('\n').map(Number).reduce((s, v, i, a) => s + +!!(i > 0 && v > a[i - 1]), 0)
}
const partTwo = (i: string): number => {
    return i.split('\n').map(Number).reduce((s, v, i, a) => s + +!!(i > 2 && v > a[i - 3]), 0)
}

// --- Tests

partOneEnabled && testsEnabled && (() => {
    assertEquals(partOne('199\n' +
        '200\n' +
        '208\n' +
        '210\n' +
        '200\n' +
        '207\n' +
        '240\n' +
        '269\n' +
        '260\n' +
        '263'), 7)
})()

partTwoEnabled && testsEnabled && (() => {
    assertEquals(partTwo('199\n' +
        '200\n' +
        '208\n' +
        '210\n' +
        '200\n' +
        '207\n' +
        '240\n' +
        '269\n' +
        '260\n' +
        '263'), 5)
})()

// --- End Tests

partOneEnabled && runAndTime('partOne', () => partOne(input))
partTwoEnabled && runAndTime('partTwo', () => partTwo(input2))