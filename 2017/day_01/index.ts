import { assertEquals } from "https://deno.land/std@0.112.0/testing/asserts.ts";
import { getEnabledParts, getInput, pairWise, runAndTime } from "../../utils/utils.ts";

const [partOneEnabled, partTwoEnabled, testsEnabled] = getEnabledParts()
const [input, input2] = await getInput()

const partOne = (i: string): number => {
    return pairWise(
        [...i, i[0]].map(Number),
        (a, b) => a === b ? a : 0
    ).reduce((a, b) => a + b, 0)
}
const partTwo = (i: string): number => {
    const len = i.length / 2
    return pairWise(
        [...i, ...i.slice(0, len)].map(Number),
        (a, b) => a === b ? a : 0,
        len
    ).reduce((a, b) => a + b, 0)
}

// --- Tests

partOneEnabled && testsEnabled && (() => {
    assertEquals(partOne('1122'), 3)
    assertEquals(partOne('1111'), 4)
    assertEquals(partOne('1234'), 0)
    assertEquals(partOne('91212129'), 9)
})()

partTwoEnabled && testsEnabled && (() => {
    assertEquals(partTwo('1212'), 6)
    assertEquals(partTwo('1221'), 0)
    assertEquals(partTwo('123425'), 4)
    assertEquals(partTwo('123123'), 12)
    assertEquals(partTwo('12131415'), 4)
})()

// --- End Tests

partOneEnabled && runAndTime('partOne', () => partOne(input))
partTwoEnabled && runAndTime('partTwo', () => partTwo(input2))