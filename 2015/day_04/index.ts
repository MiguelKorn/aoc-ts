import { assertEquals } from "https://deno.land/std@0.112.0/testing/asserts.ts";
import { getEnabledParts, getInput, runAndTime } from "../../utils/utils.ts";
import MD5 from "./md5.ts";

const [partOneEnabled, partTwoEnabled, testsEnabled] = getEnabledParts()
const [input, input2] = await getInput()


const partOne = (i: string, r = /^0{5}/): number => {
    let j = 1;
    while (!r.test(MD5(i + j).toString())) j++
    return j
}
const partTwo = (i: string): number => {
    return partOne(i, /^0{6}/)
}

// --- Tests

partOneEnabled && testsEnabled && (() => {
    assertEquals(partOne('abcdef'), 609043)
    assertEquals(partOne('pqrstuv'), 1048970)
})()

partTwoEnabled && testsEnabled && (() => {})()

// --- End Tests

partOneEnabled && runAndTime('partOne', () => partOne(input))
partTwoEnabled && runAndTime('partTwo', () => partTwo(input2))