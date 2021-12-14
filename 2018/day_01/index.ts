import { assertEquals } from "https://deno.land/std@0.112.0/testing/asserts.ts";
import { getEnabledParts, getInput, runAndTime } from "../../utils/utils.ts";

const [partOneEnabled, partTwoEnabled, testsEnabled] = getEnabledParts()
const [input, input2] = await getInput()

const partOne = (i: string): number => {
    return i.split("\n").reduce((acc, n) => acc + +n, 0)
}
const partTwo = (i: string): number => {
    const nums = i.split("\n").map(Number)
    const seen = new Set<number>()
    let sum = 0
    let n = 0
    while (!seen.has(sum)) {
        seen.add(sum)
        sum += nums[n]
        n = (n + 1) % nums.length
    }
    return sum
}

// --- Tests

partOneEnabled && testsEnabled && (() => {
    assertEquals(partOne('+1\n-2\n+3\n+1'), 3)
})()

partTwoEnabled && testsEnabled && (() => {
    assertEquals(partTwo('+1\n-1'), 0)
    assertEquals(partTwo('+3\n+3\n+4\n-2\n-4'), 10)
    assertEquals(partTwo('-6\n+3\n+8\n+5\n-6'), 5)
    assertEquals(partTwo('+7\n+7\n-2\n-7\n-4'), 14)
})()

// --- End Tests

partOneEnabled && runAndTime('partOne', () => partOne(input))
partTwoEnabled && runAndTime('partTwo', () => partTwo(input2))