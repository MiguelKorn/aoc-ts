import { assertEquals } from "https://deno.land/std@0.112.0/testing/asserts.ts";
import { createGrid, getEnabledParts, getInput, runAndTime } from "../../utils/utils.ts";

const [partOneEnabled, partTwoEnabled, testsEnabled] = getEnabledParts()
const [input, input2] = await getInput()

const printGrid = (grid: [number, number][]) => {
    const [x, y] = grid.reduce(([x, y], [nx, ny]) => [x > nx ? x : nx, y > ny ? y : ny], [0, 0])
    const g = createGrid(y+1, x + 1, ' ')
    grid.forEach(([x, y]) => g[y][x] = '#')
    console.log(g.map(r => r.join('')).join('\n'))
}

const partOne = (i: string, p2 = false): number => {
    const ins = i.split('\n\n').map(s => s.split('\n'))
    let marks = ins[0].map(mark => mark.split(',').map(Number)) as [number, number][]

    for (let j = 0; j <= ins[1].length - 1; j++) {
        const [_, dir, amount] = ins[1][j].match(/([xy])=(\d+)/)!
        marks = marks.reduce((acc, [x, y], i) => {
            if (dir === 'x' && x > +amount) x = +amount - (x - +amount)
            if (dir === 'y' && y > +amount) y = +amount - (y - +amount)
            acc[i] = [x, y]
            return acc
        }, marks)
        if (!p2 && j === 0) return new Set(marks.map(([x,y])=>`${x},${y}`)).size
    }

    printGrid(marks)
    return 0
}
const partTwo = (i: string): number => {
    return partOne(i, true)
}

// --- Tests

partOneEnabled && testsEnabled && (() => {
    assertEquals(partOne('6,10\n' +
        '0,14\n' +
        '9,10\n' +
        '0,3\n' +
        '10,4\n' +
        '4,11\n' +
        '6,0\n' +
        '6,12\n' +
        '4,1\n' +
        '0,13\n' +
        '10,12\n' +
        '3,4\n' +
        '3,0\n' +
        '8,4\n' +
        '1,10\n' +
        '2,14\n' +
        '8,10\n' +
        '9,0\n' +
        '\n' +
        'fold along y=7\n' +
        'fold along x=5'), 17)
})()

partTwoEnabled && testsEnabled && (() => {
    // assertEquals(partTwo(''), 0)
})()

// --- End Tests

partOneEnabled && runAndTime('partOne', () => partOne(input))
partTwoEnabled && runAndTime('partTwo', () => partTwo(input2))