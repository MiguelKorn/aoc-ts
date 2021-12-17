import { assertEquals } from "https://deno.land/std@0.112.0/testing/asserts.ts";
import { getEnabledParts, getInput, runAndTime } from "../../utils/utils.ts";

const [partOneEnabled, partTwoEnabled, testsEnabled] = getEnabledParts()
const [input, input2] = await getInput()

const sim = (xVel: number, yVel: number, xMin: number, xMax: number, yMin: number, yMax: number): number | null => {
    let xP = 0, yP = 0
    let height = 0;

    while (!(xMin <= xP && xP <= xMax && yMin <= yP && yP <= yMax)) {
        if (xP > xMax || yP < yMin) return null
        xP += xVel
        yP += yVel
        height = height > yP ? height : yP
        xVel -= Math.sign(xVel)
        yVel -= 1
    }

    return height
}

const partOne = (i: string, p2 = false): number => {
    const [xMin, xMax, yMin, yMax] = i.match(/(-?\d+)/g)!.map(Number)

    let maxHeight = 0
    let hits = 0
    for (let xVel = 0; xVel <= xMax; xVel++) {
        for (let yVel = yMin; yVel < -yMin; yVel++) {
            const height = sim(xVel, yVel, xMin, xMax, yMin, yMax)
            if (height !== null) {
                if (height > maxHeight) maxHeight = height
                hits++
            }
        }
    }

    return p2 ? hits : maxHeight
}
const partTwo = (i: string): number => {
    return partOne(i, true)
}

// --- Tests

partOneEnabled && testsEnabled && (() => {
    assertEquals(partOne('target area: x=20..30, y=-10..-5'), 45)
})()

partTwoEnabled && testsEnabled && (() => {
    assertEquals(partTwo('target area: x=20..30, y=-10..-5'), 112)
})()

// --- End Tests

partOneEnabled && runAndTime('partOne', () => partOne(input))
partTwoEnabled && runAndTime('partTwo', () => partTwo(input2))