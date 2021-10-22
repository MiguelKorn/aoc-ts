import { assertEquals } from "https://deno.land/std@0.112.0/testing/asserts.ts";
import { getEnabledParts, runAndTime } from "../../utils/utils.ts";

const [partOneEnabled, partTwoEnabled, testsEnabled] = getEnabledParts()
const input = await Deno.readTextFile(Deno.args[1])

const partOne = (i: string): number => {
    return i.length - (2 * (i.match(/\)/g) ?? []).length)
}
const partTwo = (i: string): number => {
    const j = i.split('')
    let p = 0, r = 0;
    for (let k = 0; k < j.length; k++) {
        p += j[k] === '(' ? 1 : -1;
        if(p === -1) {
            r = k
            break;
        }
    }
    return r + 1
}

// --- Tests

const testPartOne = <T>(cb: (input: string) => T) => {
    assertEquals(0, cb('(())'))
    assertEquals(0, cb('()()'))
    assertEquals(3, cb('((('))
    assertEquals(3, cb('(()(()('))
    assertEquals(3, cb('))((((('))
    assertEquals(-1, cb('())'))
    assertEquals(-1, cb('))('))
    assertEquals(-1, cb('))('))
    assertEquals(-3, cb(')))'))
    assertEquals(-3, cb(')())())'))
}

const testPartTwo = <T>(cb: (input: string) => T) => {
    assertEquals(1, cb(')'))
    assertEquals(5, cb('()())'))
}

partOneEnabled && testsEnabled && testPartOne((i) => partOne(i))
partTwoEnabled && testsEnabled && testPartTwo((i) => partTwo(i))

// --- End Tests

partOneEnabled && runAndTime('partOne', () => partOne(input))
partTwoEnabled && runAndTime('partTwo', () => partTwo(input))