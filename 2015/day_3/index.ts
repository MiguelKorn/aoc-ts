import { assertEquals } from "https://deno.land/std@0.112.0/testing/asserts.ts";
import { getEnabledParts, runAndTime } from "../../utils/utils.ts";

const [partOneEnabled, partTwoEnabled, testsEnabled] = getEnabledParts()
const input = await Deno.readTextFile(Deno.args[1])

const p1 = (i: string[]) => i.reduce(({ m, x, y }, v) => {
    x += v === '>' ? 1 : v === '<' ? -1 : 0;
    y += v === '^' ? 1 : v === 'v' ? -1 : 0;
    m.set(`${x}:${y}`, 0)
    return { m, x, y }
}, { m: new Map([['0:0', 1]]), x: 0, y: 0 })

const partOne = (i: string): number => {
    return p1(i.split('')).m.size
}
const partTwo = (i: string): number => {
    const s = i.split('');
    const f = p1(s.filter((_, i) => i % 2)).m
    const g = p1(s.filter((_, i) => !(i % 2))).m
    return (new Map([...f, ...g])).size
}

// --- Tests

partOneEnabled && testsEnabled && (() => {
    assertEquals(partOne('>'), 2)
    assertEquals(partOne('^>v<'), 4)
    assertEquals(partOne('^v^v^v^v^v'), 2)
})()

partTwoEnabled && testsEnabled && (() => {
    assertEquals(partTwo('^>'), 3)
    assertEquals(partTwo('^>v<'), 3)
    assertEquals(partTwo('^v^v^v^v^v'), 11)
})()

// --- End Tests

partOneEnabled && runAndTime('partOne', () => partOne(input))
partTwoEnabled && runAndTime('partTwo', () => partTwo(input))