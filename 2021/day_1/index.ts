import { assertEquals } from "https://deno.land/std@0.112.0/testing/asserts.ts";
import { getEnabledParts, runAndTime } from "../../utils/utils.ts";

const [partOneEnabled, partTwoEnabled, testsEnabled] = getEnabledParts()
const input = await Deno.readTextFile(Deno.args[1])

const partOne = (i: string): number => {
    return i.split('\n').map(Number).reduce((sum, val, idx, arr) => {
        return sum + (idx > 0 && val > arr[idx - 1] ? 1 : 0);
    }, 0)
}
const partTwo = (i: string): number => {
    return i.split('\n').map(Number).reduce((sum, val, idx, arr) => {
        return sum + (idx > 2 && val > arr[idx - 3] ? 1 : 0);
    }, 0)
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
partTwoEnabled && runAndTime('partTwo', () => partTwo(input))