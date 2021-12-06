import { assertEquals } from "https://deno.land/std@0.112.0/testing/asserts.ts";
import { getEnabledParts, getInput, runAndTime } from "../../utils/utils.ts";

const [partOneEnabled, partTwoEnabled, testsEnabled] = getEnabledParts()
const [input, input2] = await getInput()

const partOne = (i: string, d: number = 80): number => {
    const f = i.split(",").map(Number)
    const x = [...Array(d).keys()].reduce((a, i) => {
        const z = a.filter(n => n === 0).length
        return [...a.map(n => n === 0 ? 6 : n - 1), ...(Array(z).fill(8))]
    }, f)
    return x.length
}
const partTwo = (i: string, d = 256): number => {
    // p1 way to slow and reaching array max with d = 256
    let f = i.split(",").map(Number).reduce((a, p) => {
        a[p] = a[p] + 1
        return a
    }, Array(9).fill(0));

    return [...Array(d).keys()].reduce((a) => {
        const [nf, ...rest] = a;
        a = [...rest, nf];
        a[6] += nf;
        return a
    }, f).reduce((a, c) => a + c, 0);
}

// --- Tests

partOneEnabled && testsEnabled && (() => {
    assertEquals(partOne('3,4,3,1,2', 18), 26)
    assertEquals(partOne('3,4,3,1,2'), 5934)
})()

partTwoEnabled && testsEnabled && (() => {
    assertEquals(partTwo('3,4,3,1,2', 18), 26)
    assertEquals(partTwo('3,4,3,1,2', 80), 5934)
})()

// --- End Tests

partOneEnabled && runAndTime('partOne', () => partOne(input))
partTwoEnabled && runAndTime('partTwo', () => partTwo(input2))