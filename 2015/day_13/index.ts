import { assertEquals } from "https://deno.land/std@0.112.0/testing/asserts.ts";
import { createPermutations, getEnabledParts, runAndTime } from "../../utils/utils.ts";

const [partOneEnabled, partTwoEnabled, testsEnabled] = getEnabledParts()
const [input, input2] = await getInput()

const partOne = (i: string, withMe = false): number => {
    const { m, p } = i.split('\n').reduce(({ m, p }: { m: Map<string, number>, p: string[] }, ins) => {
        const [_, p1, op, num, p2] = ins.match(/(\w+) would (\w+) (\d+) happiness units by sitting next to (\w+)./)!
        const k = [p1, p2].sort().join()
        m.set(k, (m.get(k) ?? 0) + (op === 'lose' ? -num : +num))
        if (!p.includes(p1)) p.push(p1)
        return { m, p }
    }, { m: new Map, p: [] })

    if (withMe) {
        p.forEach(p => m.set(['Me', p].sort().join(), 0))
        p.push('Me')
    }

    const permutations = createPermutations(p, true)
    const totals = permutations.map(c => c.reduce((t, v, i) => t + m.get([v, c[i + 1 === c.length ? 0 : i + 1]].sort().join())!, 0))
    return Math.max(...totals)
}
const partTwo = (i: string): number => {
    return partOne(i, true)
}

// --- Tests

partOneEnabled && testsEnabled && (() => {
    assertEquals(partOne('Alice would gain 54 happiness units by sitting next to Bob.\n' +
        'Alice would lose 79 happiness units by sitting next to Carol.\n' +
        'Alice would lose 2 happiness units by sitting next to David.\n' +
        'Bob would gain 83 happiness units by sitting next to Alice.\n' +
        'Bob would lose 7 happiness units by sitting next to Carol.\n' +
        'Bob would lose 63 happiness units by sitting next to David.\n' +
        'Carol would lose 62 happiness units by sitting next to Alice.\n' +
        'Carol would gain 60 happiness units by sitting next to Bob.\n' +
        'Carol would gain 55 happiness units by sitting next to David.\n' +
        'David would gain 46 happiness units by sitting next to Alice.\n' +
        'David would lose 7 happiness units by sitting next to Bob.\n' +
        'David would gain 41 happiness units by sitting next to Carol.'), 330)
})()

partTwoEnabled && testsEnabled && (() => {})()

// --- End Tests

partOneEnabled && runAndTime('partOne', () => partOne(input))
partTwoEnabled && runAndTime('partTwo', () => partTwo(input2))