import { assertEquals } from "https://deno.land/std@0.112.0/testing/asserts.ts";
import { getEnabledParts, runAndTime } from "../../utils/utils.ts";

const [partOneEnabled, partTwoEnabled] = getEnabledParts()
const input = await Deno.readTextFile(Deno.args[1])

const partOne = (input: string): number => {
    return 0
}
const partTwo = (input: string): number => {
    return 0
}

// --- Tests

const testPartOne = <T>(cb: (input: string) => T) => {
    assertEquals(0, cb(''))
}

const testPartTwo = <T>(cb: (input: string) => T) => {
    assertEquals(0, cb(''))
}

partOneEnabled && testPartOne((i) => partOne(i))
partTwoEnabled && testPartTwo((i) => partTwo(i))

// --- End Tests

partOneEnabled && runAndTime('partOne', () => partOne(input))
partTwoEnabled && runAndTime('partTwo', () => partTwo(input))