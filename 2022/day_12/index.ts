import { assertEquals } from "https://deno.land/std@0.112.0/testing/asserts.ts";
import { getEnabledParts, getInput, runAndTime } from "../../utils/utils.ts";

const [partOneEnabled, partTwoEnabled, testsEnabled] = getEnabledParts()
const [input, input2] = await getInput()

type Point = {
    x: number
    y: number
    f: number
    g: number
    h: number
    spot: string
    neighbors: Point[]
    parent: Point | null
}

const AStar = (start: Point, end: Point) => {
    const toSearch = [start]
    const visited = []
    const path = []

    while (toSearch.length > 0) {
        let lowestIndex = 0
        for (let j = 0; j < toSearch.length; j++) {
            if (toSearch[j].f < toSearch[lowestIndex].f) {
                lowestIndex = j
            }
        }
        let current = toSearch[lowestIndex]
        if (current.x === end.x && current.y === end.y) {
            let tmp = current
            path.push(tmp)
            while (tmp.parent) {
                path.push(tmp.parent)
                tmp = tmp.parent
            }
            console.log("Done")
            return path.reverse()
        }

        toSearch.splice(lowestIndex, 1)
        visited.push(current)

        let neighbors = current.neighbors
        for (let j = 0; j < neighbors.length; j++) {
            let neighbor = neighbors[j];

            if (!visited.includes(neighbor)) {
                let possibleG = current.g + 1;

                if (!toSearch.includes(neighbor)) {
                    toSearch.push(neighbor);
                } else if (possibleG >= neighbor.g) {
                    continue;
                }

                neighbor.g = possibleG;
                // neighbor.h = heuristic(neighbor, end);
                neighbor.f = neighbor.g;
                neighbor.parent = current;
            }
        }
    }

    return []
}

const partOne = (i: string): number => {
    const basePoint: Point = {x: 0, y: 0, f: 0, g: 0, h: 0, spot: "", neighbors: [], parent: null}
    let [startPos, endPos, grid] = i.split("\n").reduce(([startPos, endPos, grid], line, y) => {
        const points = line.split("").map((spot, x) => ({...basePoint, x, y, spot, neighbors: [], parent: null}))
        const s = line.indexOf("S")
        if (s !== -1) startPos = points[s]
        const e = line.indexOf("E")
        if (line.indexOf("E") !== -1) endPos = points[e]
        return [startPos, endPos, [...grid, points]]
    }, [{...basePoint}, {...basePoint}, []] as [Point, Point, Point[][]])

    grid = grid.map((row, y) => row.map((point, x) => {
        const neighbors = []
        if (x > 0) neighbors.push({...grid[y][x - 1]})
        if (x < row.length - 1) neighbors.push({...grid[y][x + 1]})
        if (y > 0) neighbors.push({...grid[y - 1][x]})
        if (y < grid.length - 1) neighbors.push({...grid[y + 1][x]})
        point.neighbors.push(...neighbors.filter(({spot}) => {
            const current = (point.spot === "S" ? "a" : point.spot).charCodeAt(0)
            const next = (spot === "E" ? "z" : spot).charCodeAt(0)
            return next <= current + 1
        }))
        return point
    }))

    return AStar(startPos, endPos).length - 1
}
const partTwo = (i: string): number => {
    const basePoint: Point = {x: 0, y: 0, f: 0, g: 0, h: 0, spot: "", neighbors: [], parent: null}
    let [startPos, endPos, grid] = i.split("\n").reduce(([startPos, endPos, grid], line, y) => {
        const points = line.split("").map((spot, x) => ({...basePoint, x, y, spot, neighbors: [], parent: null}))
        const s = line.indexOf("S")
        if (s !== -1) startPos = points[s]
        const e = line.indexOf("E")
        if (line.indexOf("E") !== -1) endPos = points[e]
        return [startPos, endPos, [...grid, points]]
    }, [{...basePoint}, {...basePoint}, []] as [Point, Point, Point[][]])

    const startingPoints: Point[] = []
    grid = grid.map((row, y) => row.map((point, x) => {
        if(["a", "S"].includes(point.spot)) startingPoints.push(point)
        const neighbors = []
        if (x > 0) neighbors.push({...grid[y][x - 1]})
        if (x < row.length - 1) neighbors.push({...grid[y][x + 1]})
        if (y > 0) neighbors.push({...grid[y - 1][x]})
        if (y < grid.length - 1) neighbors.push({...grid[y + 1][x]})
        point.neighbors.push(...neighbors.filter(({spot}) => {
            const current = (point.spot === "S" ? "a" : point.spot).charCodeAt(0)
            const next = (spot === "E" ? "z" : spot).charCodeAt(0)
            return next <= current + 1
        }))
        return point
    }))


    return startingPoints.map((start, i) => {
        if(i % 50 === 0) console.log(i)
        return AStar(start, endPos).length - 1
    }).filter(x => x !== -1).sort((a, b) => a - b)[0]
}

// --- Tests

const testInput = "Sabqponm\n" +
    "abcryxxl\n" +
    "accszExk\n" +
    "acctuvwj\n" +
    "abdefghi"

partOneEnabled && testsEnabled && (() => {
    assertEquals(partOne(testInput), 31)
})()

partTwoEnabled && testsEnabled && (() => {
    assertEquals(partTwo(testInput), 29)
})()

// --- End Tests

partOneEnabled && runAndTime('partOne', () => partOne(input))
partTwoEnabled && runAndTime('partTwo', () => partTwo(input2))