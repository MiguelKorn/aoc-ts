import { assertEquals } from "https://deno.land/std@0.112.0/testing/asserts.ts";
import { getEnabledParts, range, runAndTime } from "../../utils/utils.ts";

const [partOneEnabled, partTwoEnabled, testsEnabled] = getEnabledParts()
const [input, input2] = await getInput()

const partOne = (i: string): number => {
    const pos = i.split(', ').reduce(([x, y, z], [to, ...amount]) => {
        const a = +amount.join('')
        let newDir = z + (to === 'L' ? -1 : 1);
        newDir = newDir < 0 ? 3 : newDir > 3 ? 0 : newDir;
        x += newDir === 1 ? a : newDir === 3 ? -a : 0
        y += newDir === 0 ? a : newDir === 2 ? -a : 0
        return [x, y, newDir]
    }, [0, 0, 0])
    return Math.abs(pos[0]) + Math.abs(pos[1])
}
const partTwo = (i: string): number => {
    const pos = i.split(', ').reduce(([x, y, z, v, s], [to, ...amount]: string) => {
        if (s) return [x, y, z, v, s]
        const a = +amount.join('')
        let newDir = (z + (to === 'L' ? z === 0 ? 3 : -1 : 1)) % 4;
        const newX = x + (newDir === 1 ? a : newDir === 3 ? -a : 0)
        const newY = y + (newDir === 0 ? a : newDir === 2 ? -a : 0)

        for (const i of range(1, a + 1)) {
            if ([1, 3].includes(newDir)) {
                const nX = x + (newX > x ? i : -i)
                if (v.includes([nX, newY].join(':'))) return [nX, newY, z, v, true]
                v.push([nX, newY].join(':'))
            } else {
                const nY = y + (newY > y ? i : -i)
                if (v.includes([newX, nY].join(':'))) return [newX, nY, z, v, true]
                v.push([newX, nY].join(':'))
            }
        }
        return [newX, newY, newDir, v, s]
    }, [0, 0, 0, ["0:0"], false] as any)
    return Math.abs(pos[0]) + Math.abs(pos[1])
}

// --- Tests

partOneEnabled && testsEnabled && (() => {
    assertEquals(partOne('R2, L3'), 5)
    assertEquals(partOne('R2, R2, R2'), 2)
    assertEquals(partOne('R5, L5, R5, R3'), 12)
    assertEquals(partOne('L100, R100'), 200)
})()

partTwoEnabled && testsEnabled && (() => {
    assertEquals(partTwo('R8, R4, R4, R8'), 4)
})()

// --- End Tests

partOneEnabled && runAndTime('partOne', () => partOne(input))
partTwoEnabled && runAndTime('partTwo', () => partTwo(input2))