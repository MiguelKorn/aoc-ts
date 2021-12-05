import { assertEquals } from "https://deno.land/std@0.112.0/testing/asserts.ts";
import { getEnabledParts, runAndTime } from "../../utils/utils.ts";

const [partOneEnabled, partTwoEnabled, testsEnabled] = getEnabledParts()
const input = await Deno.readTextFile(Deno.args[1])

const parseInput = (input: string) => input.split("\n\n").map((s, i) => i > 0 ? parseBoard(s) : s.split(',').map(Number)) as [number[], number[][]]
const parseBoard = (rawBoard: string) => rawBoard.split('\n').map(b => b.match(/\d+/g)!.map(Number))
const checkRowWin = (row: number[]) => row.reduce((acc, curr) => acc + curr, 0) === -5
const checkColWin = (board: number[][]) => board.map((_, i) => board.reduce((a, v, j) => a + board[j][i], 0)).includes(-5)
const calcScore = (board: number[][], lastN: number) => board.flatMap(n => [...n]).filter(x => x > -1).reduce((acc, curr) => acc + curr, 0) * lastN

const partOne = (i: string): number | undefined => {
    const [nums, ...boards] = parseInput(i)
    for (const [id, x] of nums.entries()) {
        for (const [idx, board] of boards.entries()) {
            for (const row of board) {
                if (row.includes(x)) row[row.indexOf(x)] = -1
                if (checkRowWin(row) || checkColWin(board)) {
                    return calcScore(boards[idx], nums[id])
                }
            }
        }
    }
}
const partTwo = (i: string): number | undefined => {
    const [nums, ...boards] = parseInput(i)
    let solved: Set<number> = new Set
    for (const [id, x] of nums.entries()) {
        for (const [idx, board] of boards.entries()) {
            if (solved.has(idx)) continue
            for (const row of board) {
                if (row.includes(x)) row[row.indexOf(x)] = -1
                if (checkRowWin(row) || checkColWin(board)) {
                    solved.add(idx)
                    if (solved.size === boards.length) {
                        return calcScore(boards[idx], nums[id])
                    }
                }
            }
        }
    }
}

// --- Tests

partOneEnabled && testsEnabled && (() => {
    assertEquals(partOne('7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1\n' +
        '\n' +
        '22 13 17 11  0\n' +
        ' 8  2 23  4 24\n' +
        '21  9 14 16  7\n' +
        ' 6 10  3 18  5\n' +
        ' 1 12 20 15 19\n' +
        '\n' +
        ' 3 15  0  2 22\n' +
        ' 9 18 13 17  5\n' +
        '19  8  7 25 23\n' +
        '20 11 10 24  4\n' +
        '14 21 16 12  6\n' +
        '\n' +
        '14 21 17 24  4\n' +
        '10 16 15  9 19\n' +
        '18  8 23 26 20\n' +
        '22 11 13  6  5\n' +
        ' 2  0 12  3  7'), 4512)
    assertEquals(partOne(input), 51034)
})()

partTwoEnabled && testsEnabled && (() => {
    assertEquals(partTwo('7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1\n' +
        '\n' +
        '22 13 17 11  0\n' +
        ' 8  2 23  4 24\n' +
        '21  9 14 16  7\n' +
        ' 6 10  3 18  5\n' +
        ' 1 12 20 15 19\n' +
        '\n' +
        ' 3 15  0  2 22\n' +
        ' 9 18 13 17  5\n' +
        '19  8  7 25 23\n' +
        '20 11 10 24  4\n' +
        '14 21 16 12  6\n' +
        '\n' +
        '14 21 17 24  4\n' +
        '10 16 15  9 19\n' +
        '18  8 23 26 20\n' +
        '22 11 13  6  5\n' +
        ' 2  0 12  3  7'), 1924)
})()

// --- End Tests

partOneEnabled && runAndTime('partOne', () => partOne(input))
partTwoEnabled && runAndTime('partTwo', () => partTwo(input))