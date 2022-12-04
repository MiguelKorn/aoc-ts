import {assertEquals} from "https://deno.land/std@0.112.0/testing/asserts.ts";
import {getEnabledParts, getInput, runAndTime} from "../../utils/utils.ts";

const [partOneEnabled, partTwoEnabled, testsEnabled] = getEnabledParts()
const [input, input2] = await getInput()

const partOne = (i: string): number => {
    const l = i.split("\n")


    return l.map(row => {
        const [fs, fe, ss, se] = row.match(/(\d+)/g)!.map(Number)

        const firstContainsSecond = ss >= fs && se <= fe
        const secondContainsFirst = fs >= ss && fe <= se
        if (firstContainsSecond || secondContainsFirst) {
            return 1
        }

        return 0
    }).reduce((a, b) => a + b, 0 as number)
}
const partTwo = (i: string): number => {
    const l = i.split("\n")


    return l.map(row => {
        const [fs, fe, ss, se] = row.match(/(\d+)/g)!.map(Number)

        const firstContainsSecond = ss > fe
        const secondContainsFirst = fs > se
        if (!(firstContainsSecond || secondContainsFirst)) {
            return 1
        }

        return 0
    }).reduce((a, b) => a + b, 0 as number)
}

// --- Tests

partOneEnabled && testsEnabled && (() => {
    assertEquals(partOne('2-4,6-8\n' +
        '2-3,4-5\n' +
        '5-7,7-9\n' +
        '2-8,3-7\n' +
        '6-6,4-6\n' +
        '2-6,4-8'), 2)
})()

partTwoEnabled && testsEnabled && (() => {
    assertEquals(partTwo('2-4,6-8\n' +
        '2-3,4-5\n' +
        '5-7,7-9\n' +
        '2-8,3-7\n' +
        '6-6,4-6\n' +
        '2-6,4-8'), 4)
})()

// --- End Tests

partOneEnabled && runAndTime('partOne', () => partOne(input))
partTwoEnabled && runAndTime('partTwo', () => partTwo(input2))