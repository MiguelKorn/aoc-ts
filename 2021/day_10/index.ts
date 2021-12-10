import { assertEquals } from "https://deno.land/std@0.112.0/testing/asserts.ts";
import { getEnabledParts, getInput, runAndTime } from "../../utils/utils.ts";

const [partOneEnabled, partTwoEnabled, testsEnabled] = getEnabledParts()
const [input, input2] = await getInput()

const partOne = (i: string): number => {
    const lines = i.split("\n")

    const nums: number[] = []
    lines.forEach(c => {
        while (c.includes('()') || c.includes('[]') || c.includes('{}') || c.includes('<>')) {
            if (c.includes('()')) c = c.replace(/(\(\))/g, '')
            if (c.includes('[]')) c = c.replace(/(\[])/g, '')
            if (c.includes('{}')) c = c.replace(/({})/g, '')
            if (c.includes('<>')) c = c.replace(/(<>)/g, '')
        }

        if (c.includes(')') || c.includes(']') || c.includes('}') || c.includes('>')) {
            let char = c.charAt(0)
            c = c.substring(1)
            while (char === '(' || char === '[' || char === '{' || char === '<') {
                char = c.charAt(0)
                c = c.substring(1)
            }

            if (char === ')') nums.push(3)
            if (char === ']') nums.push(57)
            if (char === '}') nums.push(1197)
            if (char === '>') nums.push(25137)
        }
    })

    const x1 = nums.filter(n => n === 3).length * 3
    const x2 = nums.filter(n => n === 57).length * 57
    const x3 = nums.filter(n => n === 1197).length * 1197
    const x4 = nums.filter(n => n === 25137).length * 25137

    return x1 + x2 + x3 + x4
}
const partTwo = (i: string): number => {
    const lines = i.split("\n")

    const nums: number[] = []
    lines.forEach((c) => {
        while (c.includes('()') || c.includes('[]') || c.includes('{}') || c.includes('<>')) {
            if (c.includes('()')) c = c.replace(/(\(\))/g, '')
            if (c.includes('[]')) c = c.replace(/(\[])/g, '')
            if (c.includes('{}')) c = c.replace(/({})/g, '')
            if (c.includes('<>')) c = c.replace(/(<>)/g, '')
        }

        if (!(c.includes(')') || c.includes(']') || c.includes('}') || c.includes('>'))) {
            const n = c.split("").reverse().reduce((a, b) => {
                a *= 5
                if (b === '(') a += 1
                if (b === '[') a += 2
                if (b === '{') a += 3
                if (b === '<') a += 4
                return a
            }, 0)
            nums.push(n)
        }
    })
    nums.sort((a, b) => a - b)
    console.log(nums, Math.floor(nums.length / 2))
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