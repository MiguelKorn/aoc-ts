import {assertEquals} from "https://deno.land/std@0.112.0/testing/asserts.ts";
import {getEnabledParts, getInput, runAndTime} from "../../utils/utils.ts";

const [partOneEnabled, partTwoEnabled, testsEnabled] = getEnabledParts()
const [input, input2] = await getInput()

const check = (left: number | Array<number>, right: number | Array<number>): boolean | null => {
    if (Array.isArray(left) && Array.isArray(right)) {
        const smallestLength = Math.min(left.length, right.length)
        for (let j = 0; j < smallestLength; j++) {
            const c = check(left[j], right[j])
            if (c === null) continue
            return check(left[j], right[j])
        }
        if (left.length < right.length) return true
        if (left.length > right.length) return false
        return null
    }

    if (!Array.isArray(left) && !Array.isArray(right) && !isNaN(left) && !isNaN(right)) {
        if (left === right) return null
        return left < right
    }

    if (Array.isArray(left)) return check(left, [right as number])

    return check([left], right)
}

const partOne = (i: string): number => {
    const lines = i.split("\n\n").map(x => x.split("\n").map(eval))
    const rightOrder: number[] = []
    lines.forEach(([left, right], i) => {
        const c = check(left, right)
        if (c) rightOrder.push(i + 1)
    })
    return rightOrder.reduce((a, b) => a + b, 0)
}
const partTwo = (i: string): number => {
    const lines = i.split("\n\n").map(x => x.split("\n").map(eval))
    const rightOrder: number[] = []
    lines.forEach(([left, right], i) => {
        const c = check(left, right)
        if (c) rightOrder.push(i + 1)
    })

    const extra = [[[2]], [[6]]]
    const all = [...extra, ...lines.flatMap(x => x)].sort((a, b) => check(a, b) ? -1 : 1)

    return extra.map(x => all.findIndex(y => y === x) + 1).reduce((a, b) => a * b, 1)
}

// --- Tests

const testInput = "[1,1,3,1,1]\n" +
    "[1,1,5,1,1]\n" +
    "\n" +
    "[[1],[2,3,4]]\n" +
    "[[1],4]\n" +
    "\n" +
    "[9]\n" +
    "[[8,7,6]]\n" +
    "\n" +
    "[[4,4],4,4]\n" +
    "[[4,4],4,4,4]\n" +
    "\n" +
    "[7,7,7,7]\n" +
    "[7,7,7]\n" +
    "\n" +
    "[]\n" +
    "[3]\n" +
    "\n" +
    "[[[]]]\n" +
    "[[]]\n" +
    "\n" +
    "[1,[2,[3,[4,[5,6,7]]]],8,9]\n" +
    "[1,[2,[3,[4,[5,6,0]]]],8,9]"

partOneEnabled && testsEnabled && (() => {
    assertEquals(partOne(testInput), 13)
})()

partTwoEnabled && testsEnabled && (() => {
    assertEquals(partTwo(testInput), 140)
})()

// --- End Tests

partOneEnabled && runAndTime('partOne', () => partOne(input))
partTwoEnabled && runAndTime('partTwo', () => partTwo(input2))