import { assertEquals } from "https://deno.land/std@0.112.0/testing/asserts.ts";
import { getEnabledParts, getInput, runAndTime } from "../../utils/utils.ts";

const [partOneEnabled, partTwoEnabled, testsEnabled] = getEnabledParts()
const [input, input2] = await getInput()

const mapInput = (i: string) => i.split("\n").reduce((acc, l) => {
    const [a, b] = l.split('-');
    acc.set(a, [...acc.get(a) ?? [], b]);
    acc.set(b, [...acc.get(b) ?? [], a])
    return acc
}, new Map)

const partOne = (i: string): number => {
    const m = mapInput(i)

    const findPath = (pos: string, current: string[]): number => {
        if (pos === "end") return 1;
        let count = 0;
        const next = [...current, pos];
        for (const dir of m.get(pos)) {
            if (dir.toLowerCase() !== dir || current.indexOf(dir) === -1) {
                count += findPath(dir, next);
            }
        }
        return count
    }

    return findPath('start', [])
}
const partTwo = (i: string): number => {
    const m = mapInput(i)

    const findPath = (pos: string, current: string[]) => {
        if (pos === "start" && current.length > 0) return 0;
        if (pos === "end") return 1;

        let count = 0;
        const next = [...current, pos];
        const smallTwice = [...next.filter(n => n === n.toLowerCase())
            .reduce((a, n) => a.set(n, (a.get(n) ?? 0) + 1), new Map()).values()
        ].some((v) => v > 1);

        for (const dir of m.get(pos))
            if (!smallTwice || dir.toLowerCase() !== dir || current.indexOf(dir) === -1) {
                count += findPath(dir, next);
            }
        return count
    }

    return findPath('start', [])
}

// --- Tests

partOneEnabled && testsEnabled && (() => {
    assertEquals(partOne('start-A\n' +
        'start-b\n' +
        'A-c\n' +
        'A-b\n' +
        'b-d\n' +
        'A-end\n' +
        'b-end'), 10)
    assertEquals(partOne('dc-end\n' +
        'HN-start\n' +
        'start-kj\n' +
        'dc-start\n' +
        'dc-HN\n' +
        'LN-dc\n' +
        'HN-end\n' +
        'kj-sa\n' +
        'kj-HN\n' +
        'kj-dc'), 19)
    assertEquals(partOne('fs-end\n' +
        'he-DX\n' +
        'fs-he\n' +
        'start-DX\n' +
        'pj-DX\n' +
        'end-zg\n' +
        'zg-sl\n' +
        'zg-pj\n' +
        'pj-he\n' +
        'RW-he\n' +
        'fs-DX\n' +
        'pj-RW\n' +
        'zg-RW\n' +
        'start-pj\n' +
        'he-WI\n' +
        'zg-he\n' +
        'pj-fs\n' +
        'start-RW'), 226)
})()

partTwoEnabled && testsEnabled && (() => {
    assertEquals(partTwo('dc-end\n' +
        'HN-start\n' +
        'start-kj\n' +
        'dc-start\n' +
        'dc-HN\n' +
        'LN-dc\n' +
        'HN-end\n' +
        'kj-sa\n' +
        'kj-HN\n' +
        'kj-dc'), 103)
    assertEquals(partTwo('fs-end\n' +
        'he-DX\n' +
        'fs-he\n' +
        'start-DX\n' +
        'pj-DX\n' +
        'end-zg\n' +
        'zg-sl\n' +
        'zg-pj\n' +
        'pj-he\n' +
        'RW-he\n' +
        'fs-DX\n' +
        'pj-RW\n' +
        'zg-RW\n' +
        'start-pj\n' +
        'he-WI\n' +
        'zg-he\n' +
        'pj-fs\n' +
        'start-RW'), 3509)
})()

// --- End Tests

partOneEnabled && runAndTime('partOne', () => partOne(input))
partTwoEnabled && runAndTime('partTwo', () => partTwo(input2))