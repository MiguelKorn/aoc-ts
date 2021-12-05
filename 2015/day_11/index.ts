import { assertEquals } from "https://deno.land/std@0.112.0/testing/asserts.ts";
import { getEnabledParts, getInput, runAndTime } from "../../utils/utils.ts";

const [partOneEnabled, partTwoEnabled, testsEnabled] = getEnabledParts()
const [input, input2] = await getInput()

const requirementOne = (i: string): boolean => i.split('').map(c => c.charCodeAt(0)).some((c, i, a) => !((a[i + 1] - 1 ^ c) | (a[i + 2] - 2 ^ c)))
const requirementTwo = (i: string): boolean => !/[iol]/.test(i)
const requirementThree = (i: string): boolean => /(\w)\1.*(\w)\2/.test(i);
const nextString = (str: string): string => {
    const lastChar = str.slice(-1);
    const lastCharIncremented = lastChar === 'z' ? 'a' : String.fromCharCode(lastChar.charCodeAt(0) + 1)
    const strRest = str.slice(0, -1)
    return lastCharIncremented === 'a' ? nextString(strRest) + 'a' : strRest + lastCharIncremented
}

const partOne = (i: string): string => {
    let pw = i;

    while (!(requirementOne(pw) && requirementTwo(pw) && requirementThree(pw))) pw = nextString(pw)

    return pw
}
const partTwo = (i: string): string => {
    return partOne(nextString(partOne(i)))
}

// --- Tests

partOneEnabled && testsEnabled && (() => {
    assertEquals(requirementOne('hijklmmn'), true)
    assertEquals(requirementTwo('hijklmmn'), false)
    assertEquals(requirementOne('abbceffg'), false)
    assertEquals(requirementThree('abbceffg'), true)
    assertEquals(requirementThree('abbcegjk'), false)
    assertEquals(nextString('abcdefgh'), "abcdefgi")
    assertEquals(nextString('abcdefzz'), "abcdegaa")
    assertEquals(partOne('abcdefgh'), 'abcdffaa')
    assertEquals(partOne('ghijklmn'), 'ghjaabcc')
    // before solve ans = cqjxxyzz?
})()

partTwoEnabled && testsEnabled && (() => {
    // assertEquals(partTwo(''), 0)
})()

// --- End Tests

partOneEnabled && runAndTime('partOne', () => partOne(input))
partTwoEnabled && runAndTime('partTwo', () => partTwo(input2))