import { assertEquals } from "https://deno.land/std@0.112.0/testing/asserts.ts";
import { getEnabledParts, runAndTime } from "../../utils/utils.ts";

const [partOneEnabled, partTwoEnabled, testsEnabled] = getEnabledParts()
const input = await Deno.readTextFile(Deno.args[1])

const getMostCommon = (numbers: number[][], position: number) => numbers.reduce((a, n) => a + n[position], 0) >= numbers.length / 2 ? 1 : 0
const filterPositionAndValue = (numbers: number[][], position: number, value: number) => numbers.filter(n => n[position] === value)

const partOne = (i: string): number => {
    const nums = i.split('\n').map(x => x.split('').map(Number))
    const g = [...Array(nums[0].length).keys()].map(i => getMostCommon(nums, i))
    return [g, g.map(x => x ? 0 : 1)].reduce((a, b) => a * parseInt(b.join(''), 2), 1)
}
const partTwo = (i: string): number => {
    let nums = i.split('\n').map(x => x.split('').map(Number))
    const { ox, co } = [...Array(nums[0].length).keys()].reduce(({ ox, co }, i) => ({
        ox: ox.length > 1 ? filterPositionAndValue(ox, i, getMostCommon(ox, i)) : ox,
        co: co.length > 1 ? filterPositionAndValue(co, i, getMostCommon(co, i) ? 0 : 1) : co
    }), { ox: nums, co: [...nums] })
    return [ox[0], co[0]].reduce((a, b) => a * parseInt(b.join(''), 2), 1)
}

// --- Tests

partOneEnabled && testsEnabled && (() => {
    assertEquals(partOne('00100\n' +
        '11110\n' +
        '10110\n' +
        '10111\n' +
        '10101\n' +
        '01111\n' +
        '00111\n' +
        '11100\n' +
        '10000\n' +
        '11001\n' +
        '00010\n' +
        '01010'), 198)
})()

partTwoEnabled && testsEnabled && (() => {
    assertEquals(partTwo('00100\n' +
        '11110\n' +
        '10110\n' +
        '10111\n' +
        '10101\n' +
        '01111\n' +
        '00111\n' +
        '11100\n' +
        '10000\n' +
        '11001\n' +
        '00010\n' +
        '01010'), 230)
})()

// --- End Tests

partOneEnabled && runAndTime('partOne', () => partOne(input))
partTwoEnabled && runAndTime('partTwo', () => partTwo(input))