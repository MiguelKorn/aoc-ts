import { assertEquals } from "https://deno.land/std@0.112.0/testing/asserts.ts";
import { getEnabledParts, runAndTime } from "../../utils/utils.ts";

const [partOneEnabled, partTwoEnabled, testsEnabled] = getEnabledParts()
const input = await Deno.readTextFile(Deno.args[1])

const partOne = (i: string): number => {
    return i.split('\n').filter(s => {
        if ((s.match(/[aeiou]/g) || []).length < 3) return false
        if ((s.match(/ab|cd|pq|xy/) || []).length !== 0) return false
        return s.split('').some((v, i, a) => i !== 0 && a[i - 1] === v)
    }).length
}
const partTwo = (i: string): number => {
    return i.split('\n').filter(s => {
        if(!/(\w{2}).*?(\1)/g.test(s)) return false
        return s.split('').some((v, i, a) => i > 1 && a[i - 2] === v)
    }).length
}

// --- Tests

const testPartOne = <T>(cb: (input: string) => T) => {
    assertEquals(1, cb('ugknbfddgicrmopn'))
    assertEquals(1, cb('aaa'))
    assertEquals(0, cb('jchzalrnumimnmhp'))
    assertEquals(0, cb('haegwjzuvuyypxyu'))
    assertEquals(0, cb('dvszwmarrgswjxmb'))
}

const testPartTwo = <T>(cb: (input: string) => T) => {
    assertEquals(1, cb('qjhvhtzxzqqjkmpb'))
    assertEquals(1, cb('xxyxx'))
    assertEquals(0, cb('uurcxstgmygtbstg'))
    assertEquals(0, cb('ieodomkazucvgmuy'))
}

partOneEnabled && testsEnabled && testPartOne((i) => partOne(i))
partTwoEnabled && testsEnabled && testPartTwo((i) => partTwo(i))

// --- End Tests

partOneEnabled && runAndTime('partOne', () => partOne(input))
partTwoEnabled && runAndTime('partTwo', () => partTwo(input))