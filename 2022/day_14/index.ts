import {assertEquals} from "https://deno.land/std@0.112.0/testing/asserts.ts";
import {createGrid, getEnabledParts, getInput, runAndTime} from "../../utils/utils.ts";

const [partOneEnabled, partTwoEnabled, testsEnabled] = getEnabledParts()
const [input, input2] = await getInput()

const markers = {
    "AIR": 0,
    "WALL": 1,
    "SAND": 2,
}

const partOne = (i: string): number => {
    let [min_x, max_x, max_y] = [Infinity, -Infinity, -Infinity]
    const paths = i.split("\n").map(p => p.split(" -> ").map(coord => {
        const [x, y] = coord.split(",").map(Number)
        if (x < min_x) min_x = x
        if (x > max_x) max_x = x
        if (y > max_y) max_y = y
        return [x, y]
    }))

    const grid = createGrid(max_x - min_x + 1, max_y + 1, markers.AIR)

    paths.forEach(path => {
        for (let j = 0; j < path.length - 1; j++) {
            let [from_x, from_y, to_x, to_y] = [...path[j], ...path[j + 1]]
            from_x -= min_x
            to_x -= min_x

            for (let y = Math.min(from_y, to_y); y <= Math.max(from_y, to_y); y++) {
                grid[y][from_x] = markers.WALL
            }
            for (let x = Math.min(from_x, to_x); x <= Math.max(from_x, to_x); x++) {
                grid[from_y][x] = markers.WALL
            }

        }
    })

    let isOutSide = false
    let total = 0
    while (!isOutSide) {
        let [x, y] = [500 - min_x, 0]
        let canMove = true
        while (canMove) {
            if(x - 1 < 0 || x + 1 >= grid[0].length || y + 1 >= grid.length) {
                isOutSide = true
                break
            }
            if(grid[y + 1][x] === markers.AIR) {
                y++
                continue
            }
            if(grid[y + 1][x - 1] === markers.AIR) {
                y++
                x--
                continue
            }
            if(grid[y + 1][x + 1] === markers.AIR) {
                y++
                x++
                continue
            }

            canMove = false
        }

        if(isOutSide) break

        total++
        grid[y][x] = markers.SAND

    }

    return total
}

// part 1, but with a floor two down, and some padding on the sides
const partTwo = (i: string): number => {
    let [min_x, max_x, max_y] = [Infinity, -Infinity, -Infinity]
    const paths = i.split("\n").map(p => p.split(" -> ").map(coord => {
        const [x, y] = coord.split(",").map(Number)
        if (x < min_x) min_x = x
        if (x > max_x) max_x = x
        if (y > max_y) max_y = y
        return [x, y]
    }))

    const padding = 10_000
    const grid = createGrid(max_x - min_x + 1 + (2*padding), max_y + 3, markers.AIR)
    grid[grid.length -1] = grid[grid.length -1].map(_ => markers.WALL)

    paths.forEach(path => {
        for (let j = 0; j < path.length - 1; j++) {
            let [from_x, from_y, to_x, to_y] = [...path[j], ...path[j + 1]]
            from_x = from_x - min_x + padding
            to_x = to_x - min_x + padding

            for (let y = Math.min(from_y, to_y); y <= Math.max(from_y, to_y); y++) {
                grid[y][from_x] = markers.WALL
            }
            for (let x = Math.min(from_x, to_x); x <= Math.max(from_x, to_x); x++) {
                grid[from_y][x] = markers.WALL
            }

        }
    })


    let total = 0
    const startPos = [500 - min_x+padding, 0]
    while (grid[startPos[1]][startPos[0]] !== markers.SAND) {
        let [x, y] = [...startPos]
        let canMove = true
        while (canMove) {
            if(grid[y + 1][x] === markers.AIR) {
                y++
                continue
            }
            if(grid[y + 1][x - 1] === markers.AIR) {
                y++
                x--
                continue
            }
            if(grid[y + 1][x + 1] === markers.AIR) {
                y++
                x++
                continue
            }

            canMove = false
        }

        total++
        grid[y][x] = markers.SAND
    }

    return total
}

// --- Tests

const testInput = "498,4 -> 498,6 -> 496,6\n" +
    "503,4 -> 502,4 -> 502,9 -> 494,9"

partOneEnabled && testsEnabled && (() => {
    assertEquals(partOne(testInput), 24)
})()

partTwoEnabled && testsEnabled && (() => {
    assertEquals(partTwo(testInput), 93)
})()

// --- End Tests

partOneEnabled && runAndTime('partOne', () => partOne(input))
partTwoEnabled && runAndTime('partTwo', () => partTwo(input2))