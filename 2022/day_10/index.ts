import { assertEquals } from "https://deno.land/std@0.112.0/testing/asserts.ts";
import {getEnabledParts, getInput, range, runAndTime} from "../../utils/utils.ts";

const [partOneEnabled, partTwoEnabled, testsEnabled] = getEnabledParts()
const [input, input2] = await getInput()

const partOne = (i: string): number => {
    const ops = i.split("\n")

    const flags = [20, 60, 100, 140, 180, 220]

    let values = [1]
    for(const op of ops) {
        const [cmd, val] = op.split(" ")
        const currentValue = values[values.length - 1]
        if(cmd === "noop") values.push(currentValue)
        else values = [...values, currentValue, currentValue+Number(val)]
    }

    return flags.map(f => f * values[f-1]).reduce((a, b) => a + b)
}
const partTwo = (i: string): number => {
    const ops = i.split("\n")
    const grid = [[]] as Array<Array<boolean>>
    let index = 0
    let cycle = 0
    let position = [0, 3]

    for (const ins of ops) {
        const steps = Number(ins.split(" ")[1]) || 0
        for (let i = 0; i < (ins.startsWith("n") ? 1 : 2); i++) {
            grid[index].push(range(position[0], position[1]).includes(cycle % 40))
            cycle++
            if (cycle % 40 === 0) {
                grid.push([])
                index++
            }
        }
        position = [position[0] + steps, position[1] + steps]
    }

    console.log(grid.map(row => row.map(x => x ? '#' : ' ').join('')).join("\n"))

    // BZPAJELK
    return 0
}

// --- Tests

const testInput = "addx 15\n" +
    "addx -11\n" +
    "addx 6\n" +
    "addx -3\n" +
    "addx 5\n" +
    "addx -1\n" +
    "addx -8\n" +
    "addx 13\n" +
    "addx 4\n" +
    "noop\n" +
    "addx -1\n" +
    "addx 5\n" +
    "addx -1\n" +
    "addx 5\n" +
    "addx -1\n" +
    "addx 5\n" +
    "addx -1\n" +
    "addx 5\n" +
    "addx -1\n" +
    "addx -35\n" +
    "addx 1\n" +
    "addx 24\n" +
    "addx -19\n" +
    "addx 1\n" +
    "addx 16\n" +
    "addx -11\n" +
    "noop\n" +
    "noop\n" +
    "addx 21\n" +
    "addx -15\n" +
    "noop\n" +
    "noop\n" +
    "addx -3\n" +
    "addx 9\n" +
    "addx 1\n" +
    "addx -3\n" +
    "addx 8\n" +
    "addx 1\n" +
    "addx 5\n" +
    "noop\n" +
    "noop\n" +
    "noop\n" +
    "noop\n" +
    "noop\n" +
    "addx -36\n" +
    "noop\n" +
    "addx 1\n" +
    "addx 7\n" +
    "noop\n" +
    "noop\n" +
    "noop\n" +
    "addx 2\n" +
    "addx 6\n" +
    "noop\n" +
    "noop\n" +
    "noop\n" +
    "noop\n" +
    "noop\n" +
    "addx 1\n" +
    "noop\n" +
    "noop\n" +
    "addx 7\n" +
    "addx 1\n" +
    "noop\n" +
    "addx -13\n" +
    "addx 13\n" +
    "addx 7\n" +
    "noop\n" +
    "addx 1\n" +
    "addx -33\n" +
    "noop\n" +
    "noop\n" +
    "noop\n" +
    "addx 2\n" +
    "noop\n" +
    "noop\n" +
    "noop\n" +
    "addx 8\n" +
    "noop\n" +
    "addx -1\n" +
    "addx 2\n" +
    "addx 1\n" +
    "noop\n" +
    "addx 17\n" +
    "addx -9\n" +
    "addx 1\n" +
    "addx 1\n" +
    "addx -3\n" +
    "addx 11\n" +
    "noop\n" +
    "noop\n" +
    "addx 1\n" +
    "noop\n" +
    "addx 1\n" +
    "noop\n" +
    "noop\n" +
    "addx -13\n" +
    "addx -19\n" +
    "addx 1\n" +
    "addx 3\n" +
    "addx 26\n" +
    "addx -30\n" +
    "addx 12\n" +
    "addx -1\n" +
    "addx 3\n" +
    "addx 1\n" +
    "noop\n" +
    "noop\n" +
    "noop\n" +
    "addx -9\n" +
    "addx 18\n" +
    "addx 1\n" +
    "addx 2\n" +
    "noop\n" +
    "noop\n" +
    "addx 9\n" +
    "noop\n" +
    "noop\n" +
    "noop\n" +
    "addx -1\n" +
    "addx 2\n" +
    "addx -37\n" +
    "addx 1\n" +
    "addx 3\n" +
    "noop\n" +
    "addx 15\n" +
    "addx -21\n" +
    "addx 22\n" +
    "addx -6\n" +
    "addx 1\n" +
    "noop\n" +
    "addx 2\n" +
    "addx 1\n" +
    "noop\n" +
    "addx -10\n" +
    "noop\n" +
    "noop\n" +
    "addx 20\n" +
    "addx 1\n" +
    "addx 2\n" +
    "addx 2\n" +
    "addx -6\n" +
    "addx -11\n" +
    "noop\n" +
    "noop\n" +
    "noop"

partOneEnabled && testsEnabled && (() => {
    assertEquals(partOne(testInput), 13140)
})()

partTwoEnabled && testsEnabled && (() => {
    assertEquals(partTwo(testInput), 0)
})()

// --- End Tests

partOneEnabled && runAndTime('partOne', () => partOne(input))
partTwoEnabled && runAndTime('partTwo', () => partTwo(input2))