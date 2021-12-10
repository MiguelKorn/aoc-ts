import { assertEquals } from "https://deno.land/std@0.112.0/testing/asserts.ts";
import { getEnabledParts, getInput, runAndTime } from "../../utils/utils.ts";

const [partOneEnabled, partTwoEnabled, testsEnabled] = getEnabledParts()
const [input, input2] = await getInput()

const partOne = (i: string): number => {
    const lines = i.split("\n")

    const nums = lines.reduce((a, c) => {
        const r = /(\(\)|{}|\[]|<>)/g
        while (c.match(r)) c = c.replace(r, '')

        if (c.match(/([)}\]>])/g)) {
            const char = c.match(/([)}\]>])/)![0]
            const i = [')', ']', '}', '>'].findIndex(c => c === char)
            a[i]++
        }

        return a
    }, new Array(4).fill(0))

    return [3, 57, 1197, 25137].reduce((a, b, i) => a + (b * nums[i]), 0)
}
const partTwo = (i: string): number => {
    const lines = i.split("\n")

    const nums = lines.reduce((nums: number[], c) => {
        const r = /(\(\)|{}|\[]|<>)/g
        while (c.match(r)) c = c.replace(r, '')

        if (!c.match(/([)}\]>])/g)) {
            const n = c.split("").reverse().reduce((a, b) => {
                return a * 5 + (['(', '[', '{', '<'].findIndex(c => c === b) + 1)
            }, 0)
            return [...nums, n]
        }

        return nums
    }, []).sort((a, b) => a - b)
    return nums[Math.floor(nums.length / 2)]
}

// --- Tests

partOneEnabled && testsEnabled && (() => {
    assertEquals(partOne('[({(<(())[]>[[{[]{<()<>>\n' +
        '[(()[<>])]({[<{<<[]>>(\n' +
        '{([(<{}[<>[]}>{[]{[(<()>\n' +
        '(((({<>}<{<{<>}{[]{[]{}\n' +
        '[[<[([]))<([[{}[[()]]]\n' +
        '[{[{({}]{}}([{[{{{}}([]\n' +
        '{<[[]]>}<{[{[{[]{()[[[]\n' +
        '[<(<(<(<{}))><([]([]()\n' +
        '<{([([[(<>()){}]>(<<{{\n' +
        '<{([{{}}[<[[[<>{}]]]>[]]'), 26397)
})()

partTwoEnabled && testsEnabled && (() => {
    assertEquals(partTwo('[({(<(())[]>[[{[]{<()<>>\n' +
        '[(()[<>])]({[<{<<[]>>(\n' +
        '{([(<{}[<>[]}>{[]{[(<()>\n' +
        '(((({<>}<{<{<>}{[]{[]{}\n' +
        '[[<[([]))<([[{}[[()]]]\n' +
        '[{[{({}]{}}([{[{{{}}([]\n' +
        '{<[[]]>}<{[{[{[]{()[[[]\n' +
        '[<(<(<(<{}))><([]([]()\n' +
        '<{([([[(<>()){}]>(<<{{\n' +
        '<{([{{}}[<[[[<>{}]]]>[]]'), 288957
    )
})()

// --- End Tests

partOneEnabled && runAndTime('partOne', () => partOne(input))
partTwoEnabled && runAndTime('partTwo', () => partTwo(input2))