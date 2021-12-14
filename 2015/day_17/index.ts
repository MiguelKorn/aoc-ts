import { assertEquals } from "https://deno.land/std@0.112.0/testing/asserts.ts";
import { getEnabledParts, getInput, runAndTime, subsetSum } from "../../utils/utils.ts";

const [partOneEnabled, partTwoEnabled, testsEnabled] = getEnabledParts()
const [input, input2] = await getInput()

const partOne = (i: string, amount: number = 150): number => {
    const c = i.split("\n").map(Number)
    const n = [...subsetSum(c, amount)]
    return n.length
}
const partTwo = (i: string, amount: number = 150): number => {
    const c = i.split("\n").map(Number)
    const n = [...subsetSum(c, amount)]
    const minC = Math.min(...[...n.map(x => x.length)])
    return n.filter(x => x.length === minC).length
}

// --- Tests

partOneEnabled && testsEnabled && (() => {
    assertEquals(partOne('20\n15\n10\n5\n5', 25), 4)
})()

partTwoEnabled && testsEnabled && (() => {
    assertEquals(partTwo('20\n15\n10\n5\n5', 25), 3)
})()

// --- End Tests

partOneEnabled && runAndTime('partOne', () => partOne(input))
partTwoEnabled && runAndTime('partTwo', () => partTwo(input2))