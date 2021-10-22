import { assertEquals } from "https://deno.land/std@0.112.0/testing/asserts.ts";
import { getEnabledParts, runAndTime } from "../../utils/utils.ts";

const [partOneEnabled, partTwoEnabled] = getEnabledParts()
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

const testPartOne = <T>(cb: (input: string) => T) => {
    assertEquals(2, cb('>'))
    assertEquals(4, cb('^>v<'))
    assertEquals(2, cb('^v^v^v^v^v'))
}

const testPartTwo = <T>(cb: (input: string) => T) => {
    assertEquals(3, cb('^>'))
    assertEquals(3, cb('^>v<'))
    assertEquals(11, cb('^v^v^v^v^v'))
}

partOneEnabled && testPartOne((i) => partOne(i))
partTwoEnabled && testPartTwo((i) => partTwo(i))

// --- End Tests

partOneEnabled && runAndTime('partOne', () => partOne(input))
partTwoEnabled && runAndTime('partTwo', () => partTwo(input))