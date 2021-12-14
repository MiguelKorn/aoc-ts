import { assertEquals } from "https://deno.land/std@0.112.0/testing/asserts.ts";
import { createPermutations, getEnabledParts, runAndTime } from "../../utils/utils.ts";

const [partOneEnabled, partTwoEnabled, testsEnabled] = getEnabledParts()
const [input, input2] = await getInput()

const partOne = (i: string): [min: number, max: number] => {
    const m = new Map();
    const m2 = new Map();
    const locations: Array<string> = [];
    i.split('\n').forEach((str) => {
        const [_, from, to, dist] = str.match(/(\w+) to (\w+) = (\d+)/)!
        m.set([from, to].sort().join(':'), +dist)
        if (!locations.includes(from)) locations.push(from)
        if (!locations.includes(to)) locations.push(to)
    })

    createPermutations(locations).forEach((p) => {
        m2.set(p.join(':'), p.reduce((t, to, i) => {
            if (i === 0) return t
            return t + m.get([p[i - 1], to].sort().join(':'));
        }, 0))
    })

    return [Math.min(...m2.values()), Math.max(...m2.values())]
}
const partTwo = (i: string): number => {
    return partOne(i)[1]
}

// --- Tests

partOneEnabled && testsEnabled && (() => {
    assertEquals(partOne('London to Dublin = 464\nLondon to Belfast = 518\nDublin to Belfast = 141')[0], 605)
})()

partTwoEnabled && testsEnabled && (() => {
    assertEquals(partTwo('London to Dublin = 464\nLondon to Belfast = 518\nDublin to Belfast = 141'), 982)
})()

// --- End Tests

partOneEnabled && runAndTime('partOne', () => partOne(input)[0])
partTwoEnabled && runAndTime('partTwo', () => partTwo(input2))