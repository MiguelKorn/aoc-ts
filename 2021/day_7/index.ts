import { assertEquals } from "https://deno.land/std@0.112.0/testing/asserts.ts";
import { getEnabledParts, getInput, runAndTime } from "../../utils/utils.ts";

const [partOneEnabled, partTwoEnabled, testsEnabled] = getEnabledParts()
const [input, input2] = await getInput()

const partOne = (i: string, n: number = 1000): number => {
    const nums = i.split(",").map(Number);
    const mx: number[] = [...Array(n).keys()].map((i) => nums.map(x => Math.abs(x - i - 1)).reduce((acc, cur) => acc + cur, 0))
    return Math.min(...mx)
}
const partTwo = (i: string, n: number = 1000): number => {
    const nums = i.split(",").map(Number);
    const mx: number[] = [...Array(n).keys()].map((i) => nums.map(x => {
        n = Math.abs(x - i - 1)
        return n * (n + 1) / 2
    }).reduce((acc, cur) => acc + cur, 0));
    return Math.min(...mx)
}

// --- Tests

partOneEnabled && testsEnabled && (() => {
    assertEquals(partOne('16,1,2,0,4,2,7,1,2,14', 10), 37)
})()

partTwoEnabled && testsEnabled && (() => {
    assertEquals(partTwo('16,1,2,0,4,2,7,1,2,14', 10), 168)
})()

// --- End Tests

partOneEnabled && runAndTime('partOne', () => partOne(input))
partTwoEnabled && runAndTime('partTwo', () => partTwo(input2))