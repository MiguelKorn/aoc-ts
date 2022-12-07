import {assertEquals} from "https://deno.land/std@0.112.0/testing/asserts.ts";
import {getEnabledParts, getInput, runAndTime} from "../../utils/utils.ts";

const [partOneEnabled, partTwoEnabled, testsEnabled] = getEnabledParts()
const [input, input2] = await getInput()

const partOne = (i: string): number => {
    const lines = i.split("\n")
    const maxSize = 1E5
    const paths: Array<string> = []
    const sizes: Record<string, number> = {}

    for (const line of lines) {
        const [size, op, name] = line.split(" ")
        if (op === "cd") {
            if (name === "..") {
                paths.pop()
                continue
            }

            const p = [...paths, name].join(".")
            paths.push(p)
            sizes[p] = 0
            continue
        }

        if (!isNaN(Number(size))) {
            for (const path of paths) {
                sizes[path] += Number(size)
            }
        }
    }

    return Object.values(sizes).filter(s => s < maxSize).reduce((a, b) => a + b, 0)
}
const partTwo = (i: string): number => {
    const maxSpace = 7E7
    const minSpace = 3E7

    const lines = i.split("\n")
    const maxSize = 1E5
    const paths: Array<string> = []
    const sizes: Record<string, number> = {}

    for (const line of lines) {
        const [size, op, name] = line.split(" ")
        if (op === "cd") {
            if (name === "..") {
                paths.pop()
                continue
            }

            const p = [...paths, name].join(".")
            paths.push(p)
            sizes[p] = 0
            continue
        }

        if (!isNaN(Number(size))) {
            for (const path of paths) {
                sizes[path] += Number(size)
            }
        }
    }

    const total = sizes["/"]
    const unused = maxSpace - total
    const needed = minSpace - unused

    return Object.values(sizes).filter(x => x >= needed).sort((a, b) => a - b)[0]
}

// --- Tests

const testInput = "$ cd /\n" +
    "$ ls\n" +
    "dir a\n" +
    "14848514 b.txt\n" +
    "8504156 c.dat\n" +
    "dir d\n" +
    "$ cd a\n" +
    "$ ls\n" +
    "dir e\n" +
    "29116 f\n" +
    "2557 g\n" +
    "62596 h.lst\n" +
    "$ cd e\n" +
    "$ ls\n" +
    "584 i\n" +
    "$ cd ..\n" +
    "$ cd ..\n" +
    "$ cd d\n" +
    "$ ls\n" +
    "4060174 j\n" +
    "8033020 d.log\n" +
    "5626152 d.ext\n" +
    "7214296 k\n"

partOneEnabled && testsEnabled && (() => {
    assertEquals(partOne(testInput), 95437)
})()

partTwoEnabled && testsEnabled && (() => {
    assertEquals(partTwo(testInput), 24933642)
})()

// --- End Tests

partOneEnabled && runAndTime('partOne', () => partOne(input))
partTwoEnabled && runAndTime('partTwo', () => partTwo(input2))