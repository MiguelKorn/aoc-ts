import {assertEquals} from "https://deno.land/std@0.112.0/testing/asserts.ts";
import {getEnabledParts, getInput, runAndTime} from "../../utils/utils.ts";

const [partOneEnabled, partTwoEnabled, testsEnabled] = getEnabledParts()
const [input, input2] = await getInput()

const partOne = (i: string): number => {
    const elves = i.split("\n\n")
    const totals = elves.map(n => n.split("\n").reduce((a, b) => a + Number(b), 0))
    const sorted = totals.sort((a, b) => b - a)
    return sorted[0]
}
const partTwo = (i: string): number => {
    const elves = i.split("\n\n")
    const totals = elves.map(n => n.split("\n").reduce((a, b) => a + Number(b), 0))
    const [a, b, c] = totals.sort((a, b) => b - a)
    return a + b + c
}

// --- Tests

partOneEnabled && testsEnabled && (() => {
    assertEquals(partOne('1000\n' +
        '2000\n' +
        '3000\n' +
        '\n' +
        '4000\n' +
        '\n' +
        '5000\n' +
        '6000\n' +
        '\n' +
        '7000\n' +
        '8000\n' +
        '9000\n' +
        '\n' +
        '10000'), 24000)
})()

partTwoEnabled && testsEnabled && (() => {
    assertEquals(partTwo('1000\n' +
        '2000\n' +
        '3000\n' +
        '\n' +
        '4000\n' +
        '\n' +
        '5000\n' +
        '6000\n' +
        '\n' +
        '7000\n' +
        '8000\n' +
        '9000\n' +
        '\n' +
        '10000'), 45000)
})()

// --- End Tests

partOneEnabled && runAndTime('partOne', () => partOne(input))
partTwoEnabled && runAndTime('partTwo', () => partTwo(input2))