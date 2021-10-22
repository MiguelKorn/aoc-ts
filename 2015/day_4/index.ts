import { assertEquals } from "https://deno.land/std@0.112.0/testing/asserts.ts";
import { getEnabledParts, runAndTime } from "../../utils/utils.ts";
import MD5 from "./md5.ts";

const [partOneEnabled, partTwoEnabled, testsEnabled] = getEnabledParts()
const input = await Deno.readTextFile(Deno.args[1])


const partOne = (i: string, r = /^0{5}/): number => {
    let j = 1;
    while (!r.test(MD5(i + j).toString())) j++
    return j
}
const partTwo = (i: string): number => {
    return partOne(i, /^0{6}/)
}

// --- Tests

const testPartOne = <T>(cb: (input: string) => T) => {
    assertEquals(609043, cb('abcdef'))
    assertEquals(1048970, cb('pqrstuv'))
}

const testPartTwo = <T>(cb: (input: string) => T) => {
}

partOneEnabled && testsEnabled && testPartOne((i) => partOne(i))
partTwoEnabled && testsEnabled && testPartTwo((i) => partTwo(i))

// --- End Tests

partOneEnabled && runAndTime('partOne', () => partOne(input))
partTwoEnabled && runAndTime('partTwo', () => partTwo(input))