import { assertEquals } from "https://deno.land/std@0.112.0/testing/asserts.ts";
import { getEnabledParts, getInput, runAndTime } from "../../utils/utils.ts";

const [partOneEnabled, partTwoEnabled, testsEnabled] = getEnabledParts()
const [input, input2] = await getInput()

const partOne = (i: string, rounds = 1): number => {
    return [...Array(rounds).keys()].reduce((str) => {
        return (str.match(/(\d)\1*/g) ?? []).reduce((t, v) => `${t}${v.length}${v[0]}`, "")
    }, i).length
}
const partTwo = (i: string): number => {
    return partOne(i, 50)
}

// --- Tests

partOneEnabled && testsEnabled && (() => {
    assertEquals(partOne('1'), 2)
    assertEquals(partOne('11'), 2)
    assertEquals(partOne('21'), 4)
    assertEquals(partOne('1211'), 6)
    assertEquals(partOne('111221'), 6)
})()

partTwoEnabled && testsEnabled && (() => {
    // assertEquals(partTwo(''), 0)
})()

// --- End Tests

partOneEnabled && runAndTime('partOne', () => partOne(input, 40))
partTwoEnabled && runAndTime('partTwo', () => partTwo(input2))