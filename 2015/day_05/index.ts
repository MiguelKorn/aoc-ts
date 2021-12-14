import { assertEquals } from "https://deno.land/std@0.112.0/testing/asserts.ts";
import { getEnabledParts, getInput, runAndTime } from "../../utils/utils.ts";

const [partOneEnabled, partTwoEnabled, testsEnabled] = getEnabledParts()
const [input, input2] = await getInput()

const partOne = (i: string): number => {
    return i.split('\n').filter(s => {
        if ((s.match(/[aeiou]/g) || []).length < 3) return false
        if ((s.match(/ab|cd|pq|xy/) || []).length !== 0) return false
        return s.split('').some((v, i, a) => i !== 0 && a[i - 1] === v)
    }).length
}
const partTwo = (i: string): number => {
    return i.split('\n').filter(s => {
        if (!/(\w{2}).*?(\1)/g.test(s)) return false
        return s.split('').some((v, i, a) => i > 1 && a[i - 2] === v)
    }).length
}

// --- Tests

partOneEnabled && testsEnabled && (() => {
    assertEquals(partOne('ugknbfddgicrmopn'), 1)
    assertEquals(partOne('aaa'), 1)
    assertEquals(partOne('jchzalrnumimnmhp'), 0)
    assertEquals(partOne('haegwjzuvuyypxyu'), 0)
    assertEquals(partOne('dvszwmarrgswjxmb'), 0)
})()

partTwoEnabled && testsEnabled && (() => {
    assertEquals(partTwo('qjhvhtzxzqqjkmpb'), 1)
    assertEquals(partTwo('xxyxx'), 1)
    assertEquals(partTwo('uurcxstgmygtbstg'), 0)
    assertEquals(partTwo('ieodomkazucvgmuy'), 0)
})()

// --- End Tests

partOneEnabled && runAndTime('partOne', () => partOne(input))
partTwoEnabled && runAndTime('partTwo', () => partTwo(input2))