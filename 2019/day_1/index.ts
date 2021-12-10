import { assertEquals } from "https://deno.land/std@0.112.0/testing/asserts.ts";
import { getEnabledParts, getInput, runAndTime } from "../../utils/utils.ts";

const [partOneEnabled, partTwoEnabled, testsEnabled] = getEnabledParts()
const [input, input2] = await getInput()

const partOne = (i: string): number => {
    return i.split("\n").reduce((a, b) => a + ((Math.floor(+b / 3) - 2)), 0)
}
const partTwo = (i: string): number => {
    const getFuel = (n: number): number => {
        const f = Math.floor(n / 3) - 2
        return f <= 0 ? 0 : f + getFuel(f)
    }
    return i.split("\n").reduce((a, b) => a + getFuel(+b), 0)
}

// --- Tests

partOneEnabled && testsEnabled && (() => {
    assertEquals(partOne('12'), 2)
    assertEquals(partOne('14'), 2)
    assertEquals(partOne('1969'), 654)
    assertEquals(partOne('100756'), 33583)
})()

partTwoEnabled && testsEnabled && (() => {
    assertEquals(partTwo('14'), 2)
    assertEquals(partTwo('1969'), 966)
    assertEquals(partTwo('100756'), 50346)
})()

// --- End Tests

partOneEnabled && runAndTime('partOne', () => partOne(input))
partTwoEnabled && runAndTime('partTwo', () => partTwo(input2))