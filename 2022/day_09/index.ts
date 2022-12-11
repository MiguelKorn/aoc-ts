import {assertEquals} from "https://deno.land/std@0.112.0/testing/asserts.ts";
import {getEnabledParts, getInput, runAndTime} from "../../utils/utils.ts";

const [partOneEnabled, partTwoEnabled, testsEnabled] = getEnabledParts()
const [input, input2] = await getInput()

type Coord = [number, number]
const solve = (i: string, length: number) => {
    const lines = i.split("\n").map(l => ([l.charAt(0), Number(l.slice(1))]));

    let coords: Array<Coord> = Array.from({length}, _ => ([0, 0]));
    const visited = new Set(["0,0"]);
    const newHead: Record<string, (c: Coord) => Coord> = {
        "U": ([x, y]) => [x, --y],
        "R": ([x, y]) => [++x, y],
        "D": ([x, y]) => [x, ++y],
        "L": ([x, y]) => [--x, y]
    }

    for (const [dir, amount] of lines) {
        for (let j = 0; j < +amount; j++) {
            coords[0] = newHead[dir](coords[0])

            for (let k = 1; k < coords.length; k++) {
                const head = coords[k - 1];
                const tail = coords[k];
                if ([Math.abs(head[0] - tail[0]), Math.abs(head[1] - tail[1])].includes(2)) {
                    if (head[0] !== tail[0]) tail[0] += head[0] > tail[0] ? 1 : -1
                    if (head[1] !== tail[1]) tail[1] += head[1] > tail[1] ? 1 : -1
                }
            }


            const last = coords[coords.length - 1];
            visited.add(last.join(","));
        }
    }

    return visited.size
}
const partOne = (i: string): number => {
    return solve(i, 2)
}
const partTwo = (i: string): number => {
    return solve(i, 10)
}

// --- Tests

const testInput = "R 4\n" +
    "U 4\n" +
    "L 3\n" +
    "D 1\n" +
    "R 4\n" +
    "D 1\n" +
    "L 5\n" +
    "R 2"

const testInput2 = "R 5\n" +
    "U 8\n" +
    "L 8\n" +
    "D 3\n" +
    "R 17\n" +
    "D 10\n" +
    "L 25\n" +
    "U 20"

partOneEnabled && testsEnabled && (() => {
    assertEquals(partOne(testInput), 13)
})()

partTwoEnabled && testsEnabled && (() => {
    assertEquals(partTwo(testInput2), 36)
})()

// --- End Tests

partOneEnabled && runAndTime('partOne', () => partOne(input))
partTwoEnabled && runAndTime('partTwo', () => partTwo(input2))