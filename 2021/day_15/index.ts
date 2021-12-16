import { assertEquals } from "https://deno.land/std@0.112.0/testing/asserts.ts";
import { getEnabledParts, getInput, runAndTime } from "../../utils/utils.ts";

const shortestPath = (map: number[][], startPos = [0, 0]): number | undefined => {
    const sides = [[0, -1], [1, 0], [0, 1], [-1, 0]];
    const queue: [number[], number][] = [[startPos, 0]];
    const visited = new Set();
    while (queue.length) {
        const [[x, y], cost] = queue.shift()!;
        if (y === map.length - 1 && x === map[0].length - 1) return cost;

        for (const [dx, dy] of sides) {
            const [nx, ny] = [x + dx, y + dy];
            if (!map[ny]?.[nx] || visited.has([nx, ny].join(","))) continue;
            visited.add([nx, ny].join(","));
            queue.push([[nx, ny], cost + map[ny][nx]]);
        }

        queue.sort((a, b) => a[1] - b[1]);
    }
};

const [partOneEnabled, partTwoEnabled, testsEnabled] = getEnabledParts()
const [input, input2] = await getInput()

const partOne = (i: string): number => {
    const m = i.split('\n').map(s => s.split('').map(Number))
    return shortestPath(m)!
}
const partTwo = (i: string): number => {
    const m = i.split('\n').map(s => s.split('').map(Number))
    const lm = [...Array(m.length * 5)].map((_, y) => {
        return [...Array(m[0].length * 5)].map((_, x) => {
            const nx = x % m[0].length, ny = y % m.length
            const s = m[ny][nx] + (x - nx) / m[0].length + (y - ny) / m.length
            return s > 9 ? s - 9 : s
        })
    })

    return shortestPath(lm)!
}

// --- Tests

partOneEnabled && testsEnabled && (() => {
    assertEquals(partOne('1163751742\n' +
        '1381373672\n' +
        '2136511328\n' +
        '3694931569\n' +
        '7463417111\n' +
        '1319128137\n' +
        '1359912421\n' +
        '3125421639\n' +
        '1293138521\n' +
        '2311944581'), 40)
})()

partTwoEnabled && testsEnabled && (() => {
    assertEquals(partTwo('1163751742\n' +
        '1381373672\n' +
        '2136511328\n' +
        '3694931569\n' +
        '7463417111\n' +
        '1319128137\n' +
        '1359912421\n' +
        '3125421639\n' +
        '1293138521\n' +
        '2311944581'), 315)
})()

// --- End Tests

partOneEnabled && runAndTime('partOne', () => partOne(input))
partTwoEnabled && runAndTime('partTwo', () => partTwo(input2))