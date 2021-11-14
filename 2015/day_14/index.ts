import { assertEquals } from "https://deno.land/std@0.112.0/testing/asserts.ts";
import { getEnabledParts, runAndTime } from "../../utils/utils.ts";

const getDistance = ([speed, time, rest]: number[], seconds: number): number => {
    const cycle = time + rest
    const remaining = seconds % cycle
    const cycles = (seconds - remaining) / cycle
    const dist = +speed * time
    return cycles * dist + (remaining >= time ? dist : remaining * speed)
}

const [partOneEnabled, partTwoEnabled, testsEnabled] = getEnabledParts()
const input = await Deno.readTextFile(Deno.args[1])

const partOne = (i: string, seconds = 2503): number => {
    return Math.max(...i.split('\n').map(ins => {
        return getDistance(ins.match(/\d+/g)!.map(Number), seconds)
    }))
}
const partTwo = (i: string, seconds = 2503): number => {
    const stats: number[][] = i.split('\n').map(ins => ins.match(/\d+/g)!.map(Number));
    return Math.max(...[...Array(seconds).keys()].reduce((sum, n) => {
        const distances = stats.map(s => getDistance(s, n + 1))
        const highestDist = Math.max(...distances)
        distances.forEach((v, i) => v === highestDist ? sum[i]++ : null)
        return sum
    }, Array(stats.length).fill(0)))
}

// --- Tests

partOneEnabled && testsEnabled && (() => {
    assertEquals(partOne('Comet can fly 14 km/s for 10 seconds, but then must rest for 127 seconds.\n' +
        'Dancer can fly 16 km/s for 11 seconds, but then must rest for 162 seconds.', 1000), 1120)
})()

partTwoEnabled && testsEnabled && (() => {
    assertEquals(partTwo('Comet can fly 14 km/s for 10 seconds, but then must rest for 127 seconds.\n' +
        'Dancer can fly 16 km/s for 11 seconds, but then must rest for 162 seconds.', 1000), 689)
})()

// --- End Tests

partOneEnabled && runAndTime('partOne', () => partOne(input))
partTwoEnabled && runAndTime('partTwo', () => partTwo(input))