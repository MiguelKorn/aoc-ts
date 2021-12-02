import { assertEquals } from "https://deno.land/std@0.112.0/testing/asserts.ts";
import { getEnabledParts, runAndTime } from "../../utils/utils.ts";

const [partOneEnabled, partTwoEnabled, testsEnabled] = getEnabledParts()
const input = await Deno.readTextFile(Deno.args[1])

const partOne = (i: string): number => {
    const pos = i.split('\n').reduce(([x, y], op) => {
        const [d, v] = op.split(' ').map((n, i) => i > 0 ? +n : n.substr(0, 1)) as [string, number]
        y += (d === 'u') ? -v : (d === 'd') ? v : 0
        x += (d === 'f') ? v : (d === 'r') ? -v : 0
        return [x, y]
    }, [0, 0])
    return pos[0] * pos[1]
}
const partTwo = (i: string): number => {
    const pos = i.split('\n').reduce(([x, y, a], op) => {
        const [d, v] = op.split(' ').map((n, i) => i > 0 ? +n : n.substr(0, 1)) as [string, number]
        a += (d === 'u') ? -v : (d === 'd') ? v : 0
        x += (d === 'f') ? v : (d === 'r') ? -v : 0
        y += (d === 'f') ? v * a : 0
        return [x, y, a]
    }, [0, 0, 0])
    return pos[0] * pos[1]
}

// --- Tests

partOneEnabled && testsEnabled && (() => {
    assertEquals(partOne('forward 5\n' +
        'down 5\n' +
        'forward 8\n' +
        'up 3\n' +
        'down 8\n' +
        'forward 2'), 150)
})()

partTwoEnabled && testsEnabled && (() => {
    assertEquals(partTwo('forward 5\n' +
        'down 5\n' +
        'forward 8\n' +
        'up 3\n' +
        'down 8\n' +
        'forward 2'), 900)
})()

// --- End Tests

partOneEnabled && runAndTime('partOne', () => partOne(input))
partTwoEnabled && runAndTime('partTwo', () => partTwo(input))