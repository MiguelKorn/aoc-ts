import {assertEquals} from "https://deno.land/std@0.112.0/testing/asserts.ts";
import {getEnabledParts, getInput, runAndTime} from "../../utils/utils.ts";
import test = Deno.test;

const [partOneEnabled, partTwoEnabled, testsEnabled] = getEnabledParts()
const [input, input2] = await getInput()

const createStacks = (startPositions: Array<string>): Array<Array<string>> => {
    const rows = startPositions.reverse()
    const stacks = rows.shift()!.match(/(\d)/g)!.map(() => ([])) as Array<Array<string>>

    for (const row of rows) {
        const crates = row.match(/(.{1,4})/g)!.map(x => x.trim())
        for (const [i, crate] of crates.entries()) {
            if (crate === "") continue
            stacks[i].push(crate.charAt(1))
        }
    }

    return stacks
}

const partOne = (i: string): string => {
    const [cr, moves] = i.split("\n\n").map(x => x.split("\n"))
    const crates = createStacks(cr)

    for (const move of moves) {
        const [amount, from, to] = move.match(/(\d+)/g)!.map(Number)
        for (let i = 0; i < amount; i++) {
            crates[to - 1].push(crates[from - 1].pop()!)
        }
    }

    return crates.reduce((a, b) => a + b.slice(-1), "")
}
const partTwo = (i: string): string => {
    const [cr, moves] = i.split("\n\n").map(x => x.split("\n"))
    const crates = createStacks(cr)

    for (const move of moves) {
        const [amount, from, to] = move.match(/(\d+)/g)!.map(Number)
        const slice = crates[from - 1].splice(-amount)
        crates[to - 1] = [...crates[to - 1], ...slice]
    }

    return crates.reduce((a, b) => a + b.slice(-1), "")
}

// --- Tests

const testInput = "    [D]    \n" +
    "[N] [C]    \n" +
    "[Z] [M] [P]\n" +
    " 1   2   3 \n" +
    "\n" +
    "move 1 from 2 to 1\n" +
    "move 3 from 1 to 3\n" +
    "move 2 from 2 to 1\n" +
    "move 1 from 1 to 2"

partOneEnabled && testsEnabled && (() => {
    assertEquals(partOne(testInput), "CMZ")
})()

partTwoEnabled && testsEnabled && (() => {
    assertEquals(partTwo(testInput), "MCD")
})()

// --- End Tests

partOneEnabled && runAndTime('partOne', () => partOne(input))
partTwoEnabled && runAndTime('partTwo', () => partTwo(input2))