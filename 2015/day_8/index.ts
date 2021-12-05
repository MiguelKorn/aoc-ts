import { assertEquals } from "https://deno.land/std@0.112.0/testing/asserts.ts";
import { getEnabledParts, getInput, runAndTime } from "../../utils/utils.ts";

const [partOneEnabled, partTwoEnabled, testsEnabled] = getEnabledParts()
const [input, input2] = await getInput()

const partOne = (i: string): number => {
    return i.split('\n').reduce((t, str, i) => {
        const chars = str.slice(1, -1).match(/(\\x[0-9a-f]{2}|\\"|\\\\)/g) ?? []
        const options = ['\\"', '\\\\']
        const total = chars.reduce((t, v) => t - (options.includes(v) ? 1 : 3), str.length - 2)
        return t + (str.length - total)
    }, 0);
}
const partTwo = (i: string): number => {
    return i.split('\n').reduce((t, str, i) => {
        const chars = str.match(/(^"|"$|\\x[0-9a-f]{2}|\\\\|\\)/g) ?? []
        const options = ['"', '\\', '\\\\']
        const total = chars.reduce((t, v) => t + (options.includes(v) ? 2 : 1), str.length)
        return t + (total - str.length)
    }, 0);
}

// --- Tests

partOneEnabled && testsEnabled && (() => {
    assertEquals(partOne('""'), 2)
    assertEquals(partOne('"abc"'), 2)
    assertEquals(partOne('"aaa\\"aaa"'), 3)
    assertEquals(partOne('"\\x27"'), 5)
    assertEquals(partOne('""\n"abc"\n"aaa\\"aaa"\n"\\x27"'), 12)
})()

partTwoEnabled && testsEnabled && (() => {
    assertEquals(partTwo('""'), 4)
    assertEquals(partTwo('"abc"'), 4)
    assertEquals(partTwo('"aaa\\"aaa"'), 6)
    assertEquals(partTwo('"\\x27"'), 5)
    assertEquals(partTwo('""\n"abc"\n"aaa\\"aaa"\n"\\x27"'), 19)
})()

// --- End Tests

partOneEnabled && runAndTime('partOne', () => partOne(input))
partTwoEnabled && runAndTime('partTwo', () => partTwo(input2))