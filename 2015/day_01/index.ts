import { assertEquals } from "https://deno.land/std@0.112.0/testing/asserts.ts";
import { getEnabledParts, getInput, runAndTime } from "../../utils/utils.ts";

const [partOneEnabled, partTwoEnabled, testsEnabled] = getEnabledParts()
const [input, input2] = await getInput()

const partOne = (i: string): number => {
    return i.length - (2 * (i.match(/\)/g) ?? []).length)
}
const partTwo = (i: string): number => {
    const j = i.split('')
    let p = 0, r = 0;
    for (let k = 0; k < j.length; k++) {
        p += j[k] === '(' ? 1 : -1;
        if (p === -1) {
            r = k
            break;
        }
    }
    return r + 1
}

// --- Tests

partOneEnabled && testsEnabled && (() => {
    assertEquals(partOne('(())'), 0)
    assertEquals(partOne('()()'), 0)
    assertEquals(partOne('((('), 3)
    assertEquals(partOne('(()(()('), 3)
    assertEquals(partOne('))((((('), 3)
    assertEquals(partOne('())'), -1)
    assertEquals(partOne('))('), -1)
    assertEquals(partOne('))('), -1)
    assertEquals(partOne(')))'), -3)
    assertEquals(partOne(')())())'), -3)
})()

partTwoEnabled && testsEnabled && (() => {
    assertEquals(partTwo(')'), 1)
    assertEquals(partTwo('()())'), 5)
})()

// --- End Tests

partOneEnabled && runAndTime('partOne', () => partOne(input))
partTwoEnabled && runAndTime('partTwo', () => partTwo(input2))