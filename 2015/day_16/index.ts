import { assertEquals } from "https://deno.land/std@0.112.0/testing/asserts.ts";
import { getEnabledParts, getInput, runAndTime } from "../../utils/utils.ts";

const [partOneEnabled, partTwoEnabled, testsEnabled] = getEnabledParts()
const [input, input2] = await getInput()

const m = new Map([
    ["children", 3],
    ["cats", 7],
    ["samoyeds", 2],
    ["pomeranians", 3],
    ["akitas", 0],
    ["vizslas", 0],
    ["goldfish", 5],
    ["trees", 3],
    ["cars", 2],
    ["perfumes", 1]
])

const partOne = (i: string): number => {
    return i.split('\n').map((x) => {
        const g = x.match(/((?:\w+: \d+)+)/g)!.map(x => x.split(': '))
        return g.every(([a, b]) => m.get(a)! === +b)
    }).findIndex(x => x) + 1
}
const partTwo = (i: string): number => {
    return i.split('\n').map((x) => {
        const g = x.match(/((?:\w+: \d+)+)/g)!.map(x => x.split(': '))
        return g.every(([a, b]) => {
            if (a === 'cats' || a === 'trees') return m.get(a)! < +b
            if (a === 'pomeranians' || a === 'goldfish') return m.get(a)! > +b
            return m.get(a)! === +b
        })
    }).findIndex(x => x) + 1
}

// --- Tests

partOneEnabled && testsEnabled && (() => {
    // assertEquals(partOne(''), 0)
})()

partTwoEnabled && testsEnabled && (() => {
    // assertEquals(partTwo(''), 0)
})()

// --- End Tests

partOneEnabled && runAndTime('partOne', () => partOne(input))
partTwoEnabled && runAndTime('partTwo', () => partTwo(input2))