import { assertEquals } from "https://deno.land/std@0.112.0/testing/asserts.ts";
import { getEnabledParts, getInput, runAndTime } from "../../utils/utils.ts";

const [partOneEnabled, partTwoEnabled, testsEnabled] = getEnabledParts()
const [input, input2] = await getInput()


const map = {'X': 1, 'Y': 2, 'Z': 3}

const partOne = (i: string): number => {
    const l = i.split('\n');
    const scores: Record<string, number> = {
        "A X": 1 + 3,
        "A Y": 2 + 6,
        "A Z": 3 + 0,
        "B X": 1 + 0,
        "B Y": 2 + 3,
        "B Z": 3 + 6,
        "C X": 1 + 6,
        "C Y": 2 + 0,
        "C Z": 3 + 3,
    }
    return l.map(line => scores[line]).reduce((a, b) => a + b, 0)
}
const partTwo = (i: string): number => {
    const l = i.split('\n');
    const scores: Record<string, number> = {
        "A X": 3 + 0,
        "A Y": 1 + 3,
        "A Z": 2 + 6,
        "B X": 1 + 0,
        "B Y": 2 + 3,
        "B Z": 3 + 6,
        "C X": 2 + 0,
        "C Y": 3 + 3,
        "C Z": 1 + 6,
    }
    return l.map(line => scores[line]).reduce((a, b) => a + b, 0)
}



// --- Tests

partOneEnabled && testsEnabled && (() => {
    assertEquals(partOne('A Y\n' +
        'B X\n' +
        'C Z'), 15)
})()

partTwoEnabled && testsEnabled && (() => {
    assertEquals(partTwo('A Y\n' +
        'B X\n' +
        'C Z'), 12)
})()

// --- End Tests

partOneEnabled && runAndTime('partOne', () => partOne(input))
partTwoEnabled && runAndTime('partTwo', () => partTwo(input2))