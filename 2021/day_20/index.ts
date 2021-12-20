import { assertEquals } from "https://deno.land/std@0.112.0/testing/asserts.ts";
import { getEnabledParts, getInput, runAndTime } from "../../utils/utils.ts";

const [partOneEnabled, partTwoEnabled, testsEnabled] = getEnabledParts()
const [input, input2] = await getInput()

const n = (x: number, y: number) => [
    [x - 1, y - 1], [x, y - 1], [x + 1, y - 1],
    [x - 1, y], [x, y], [x + 1, y],
    [x - 1, y + 1], [x, y + 1], [x + 1, y + 1]
]

const parseLine = (line: string) => line.replace(/#/g, "1").replace(/\./g, "0")

const partOne = (i: string, steps: number = 2): number => {
    const input = i.split("\n\n");
    const alg = parseLine(input[0])
    let img = input[1].split("\n").map((row) => parseLine(row).split(""))

    for (let t = 0; t < steps; t++) {
        const edge = +alg[0] && t % 2
        img = [...Array(img.length + 2)].map((r, y) => {
            return [...Array(img.length + 2)].map((c, x) => {
                const num = parseInt(n(x - 1, y - 1).map(([nx, ny]) => (img[ny]?.[nx] ?? edge)).join(""), 2);
                return alg[num];
            })
        })
    }

    return img.flat().reduce((a, b) => +a + +b, 0)
}
const partTwo = (i: string, steps = 50): number => {
    return partOne(i, steps)
}

// --- Tests

partOneEnabled && testsEnabled && (() => {
    assertEquals(partOne("..#.#..#####.#.#.#.###.##.....###.##.#..###.####..#####..#....#..#..##..###..######.###...####..#..#####..##..#.#####...##.#.#..#.##..#.#......#.###.######.###.####...#.##.##..#..#..#####.....#.#....###..#.##......#.....#..#..#..##..#...##.######.####.####.#.#...#.......#..#.#.#...####.##.#......#..#...##.#.##..#...##.#.##..###.#......#.#.......#.#.#.####.###.##...#.....####.#..#..#.##.#....##..#.####....##...##..#...#......#.#.......#.......##..####..#...#.#.#...##..#.#..###..#####........#..####......#..#\n" +
        "\n" +
        "#..#.\n" +
        "#....\n" +
        "##..#\n" +
        "..#..\n" +
        "..###"), 35)
})()

partTwoEnabled && testsEnabled && (() => {
    assertEquals(partTwo("..#.#..#####.#.#.#.###.##.....###.##.#..###.####..#####..#....#..#..##..###..######.###...####..#..#####..##..#.#####...##.#.#..#.##..#.#......#.###.######.###.####...#.##.##..#..#..#####.....#.#....###..#.##......#.....#..#..#..##..#...##.######.####.####.#.#...#.......#..#.#.#...####.##.#......#..#...##.#.##..#...##.#.##..###.#......#.#.......#.#.#.####.###.##...#.....####.#..#..#.##.#....##..#.####....##...##..#...#......#.#.......#.......##..####..#...#.#.#...##..#.#..###..#####........#..####......#..#\n" +
        "\n" +
        "#..#.\n" +
        "#....\n" +
        "##..#\n" +
        "..#..\n" +
        "..###"), 3351)
})()

// --- End Tests

partOneEnabled && runAndTime('partOne', () => partOne(input))
partTwoEnabled && runAndTime('partTwo', () => partTwo(input2))