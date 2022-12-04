import { assertEquals } from "https://deno.land/std@0.112.0/testing/asserts.ts";
import { getEnabledParts, getInput, runAndTime } from "../../utils/utils.ts";

const [partOneEnabled, partTwoEnabled, testsEnabled] = getEnabledParts()
const [input, input2] = await getInput()

const partOne = (i: string): number => {
    const rucksacks = i.split("\n");
    const amount = rucksacks.map(r => {
        const h = r.length / 2
        const firstHalf = r.slice(0, h).split("")
        const secondHalf = r.slice(h).split("")
        const i = firstHalf.filter(element => secondHalf.includes(element))[0];
        const prio = i.charCodeAt(0)
        return prio - (prio > 90 ? 96 : 38)
    }).reduce((a, b) => a + b, 0);
    return amount
}
const partTwo = (i: string): number => {
    const rucksacks = i.split("\n").map(r => r.split(""));
    let total = 0;
    for (let j = 0; j < rucksacks.length; j+=3) {
        const r = rucksacks.slice(j, j+3)
        const result = r.reduce((a, b) => a.filter(c => b.includes(c)))[0];
        const prio = result.charCodeAt(0)
        total += prio - (prio > 90 ? 96 : 38)
    }
    return total
}

// --- Tests

partOneEnabled && testsEnabled && (() => {
    assertEquals(partOne('vJrwpWtwJgWrhcsFMMfFFhFp\n' +
        'jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL\n' +
        'PmmdzqPrVvPwwTWBwg\n' +
        'wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn\n' +
        'ttgJtRGJQctTZtZT\n' +
        'CrZsJsPPZsGzwwsLwLmpwMDw'), 157)
})()

partTwoEnabled && testsEnabled && (() => {
    assertEquals(partTwo('vJrwpWtwJgWrhcsFMMfFFhFp\n' +
        'jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL\n' +
        'PmmdzqPrVvPwwTWBwg\n' +
        'wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn\n' +
        'ttgJtRGJQctTZtZT\n' +
        'CrZsJsPPZsGzwwsLwLmpwMDw'), 70)
})()

// --- End Tests

partOneEnabled && runAndTime('partOne', () => partOne(input))
partTwoEnabled && runAndTime('partTwo', () => partTwo(input2))