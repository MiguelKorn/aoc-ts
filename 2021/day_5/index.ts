import { assertEquals } from "https://deno.land/std@0.112.0/testing/asserts.ts";
import { getEnabledParts, runAndTime } from "../../utils/utils.ts";

const [partOneEnabled, partTwoEnabled, testsEnabled] = getEnabledParts()
const input = await Deno.readTextFile(Deno.args[1])

const partOne = (i: string, p2 = false): number => {
    return [...i.split('\n').reduce((a, l) => {
        const [x1,y1,x2,y2] = l.match(/\d+/g)!.map(Number)
        if(x1==x2) {
            for (let j = 0; j <= Math.max(y2,y1)-Math.min(y1,y2); j++) {
                const k = [x1, (y2> y1 ? y1 : y2) + j].join(':')
                const c = a.get(k)
                a.set(k, c ? c + 1 : 1)
            }
        } else if(y1==y2) {
            for (let j = 0; j <= Math.max(x2,x1)-Math.min(x1,x2); j++) {
                const k = [(x2> x1 ? x1 : x2) + j, y1].join(':')
                const c = a.get(k)
                a.set(k, c ? c + 1 : 1)
            }
        } else{
            if(p2) {
                let x = x1, y=y1
                let k = [x2,y2].join(':')
                let c = a.get(k)
                a.set(k, c ? c + 1 : 1)
                while (x!==x2 && y!==y2) {
                    const k = [x,y].join(':')
                    const c = a.get(k)
                    a.set(k, c ? c + 1 : 1)
                    x += x2>x1 ? 1 : -1
                    y += y2>y1 ? 1 : -1
                }
            }
        }
        return a
    }, new Map).values()].filter(k => k> 1).length
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
partTwoEnabled && runAndTime('partTwo', () => partTwo(input))