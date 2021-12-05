import { assertEquals } from "https://deno.land/std@0.112.0/testing/asserts.ts";
import { getEnabledParts, getInput, runAndTime } from "../../utils/utils.ts";

const [partOneEnabled, partTwoEnabled, testsEnabled] = getEnabledParts()
const [input, input2] = await getInput()

const partOne = (i: string): number => {
    return 0
}
const partTwo = (i: string): number => {
    return 0
}

// --- Tests

partOneEnabled && testsEnabled && (() => {
    assertEquals(partOne(''), 0)
})()

partTwoEnabled && testsEnabled && (() => {
    assertEquals(partTwo(''), 0)
})()

// --- End Tests

partOneEnabled && runAndTime('partOne', () => partOne(input))
partTwoEnabled && runAndTime('partTwo', () => partTwo(input2))