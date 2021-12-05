import { assertEquals } from "https://deno.land/std@0.112.0/testing/asserts.ts";
import { getEnabledParts, runAndTime, getInput } from "../../utils/utils.ts";

const [partOneEnabled, partTwoEnabled, testsEnabled] = getEnabledParts()
const [input, input2] = await getInput()

const { max, min } = Math

const partOne = (i: string, p2 = false): number => {
    return [...i.split('\n').reduce((a, l) => {
        let [x1, y1, x2, y2] = l.match(/\d+/g)!.map(Number)
        if (x1 == x2) {
            for (let j = min(y1, y2); j <= max(y1, y2); j++) {
                const k = [x1, j].join(':')
                a.set(k, (a.get(k) ?? 0) + 1)
            }
        } else if (y1 == y2) {
            for (let j = min(x1, x2); j <= max(x1, x2); j++) {
                const k = [j, y1].join(':')
                a.set(k, (a.get(k) ?? 0) + 1)
            }
        } else {
            if (p2) {
                let k = [x2, y2].join(':')
                a.set(k, (a.get(k) ?? 0) + 1)
                while (x1 !== x2 && y1 !== y2) {
                    k = [x1, y1].join(':')
                    a.set(k, (a.get(k) ?? 0) + 1)
                    x1 += x2 > x1 ? 1 : -1
                    y1 += y2 > y1 ? 1 : -1
                }
            }
        }
        return a
    }, new Map).values()].filter(k => k > 1).length
}
const partTwo = (i: string): number => {
    return partOne(i, true)
}

// --- Tests

partOneEnabled && testsEnabled && (() => {
    assertEquals(partOne('0,9 -> 5,9\n' +
        '8,0 -> 0,8\n' +
        '9,4 -> 3,4\n' +
        '2,2 -> 2,1\n' +
        '7,0 -> 7,4\n' +
        '6,4 -> 2,0\n' +
        '0,9 -> 2,9\n' +
        '3,4 -> 1,4\n' +
        '0,0 -> 8,8\n' +
        '5,5 -> 8,2'), 5)
})()

partTwoEnabled && testsEnabled && (() => {
    assertEquals(partTwo('0,9 -> 5,9\n' +
        '8,0 -> 0,8\n' +
        '9,4 -> 3,4\n' +
        '2,2 -> 2,1\n' +
        '7,0 -> 7,4\n' +
        '6,4 -> 2,0\n' +
        '0,9 -> 2,9\n' +
        '3,4 -> 1,4\n' +
        '0,0 -> 8,8\n' +
        '5,5 -> 8,2'), 12)
})()

// --- End Tests

partOneEnabled && runAndTime('partOne', () => partOne(input))
partTwoEnabled && runAndTime('partTwo', () => partTwo(input2))