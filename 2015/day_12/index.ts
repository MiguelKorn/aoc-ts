import { assertEquals } from "https://deno.land/std@0.112.0/testing/asserts.ts";
import { getEnabledParts, getInput, runAndTime } from "../../utils/utils.ts";

const [partOneEnabled, partTwoEnabled, testsEnabled] = getEnabledParts()
const [input, input2] = await getInput()

const partOne = (i: string): number => {
    return (i.match(/(-?\d+)/g) ?? []).reduce((t, n) => t + +n, 0)
}
const partTwo = (i: string): number => {
    const numberReducer = (total: number, obj: number | any[] | Record<any, any>): number => {
        if (!isNaN(obj as number)) return total + +obj
        if (Array.isArray(obj)) return obj.reduce(numberReducer, total)
        if (typeof obj === 'object' && !Object.values(obj).includes('red')) {
            return Object.values(obj).reduce(numberReducer, total)
        }

        return total
    }
    return numberReducer(0, JSON.parse(i))
}

// --- Tests

partOneEnabled && testsEnabled && (() => {
    assertEquals(partOne('[1,2,3]'), 6)
    assertEquals(partOne('{"a":2,"b":4}'), 6)
    assertEquals(partOne('[[[3]]]'), 3)
    assertEquals(partOne('{"a":{"b":4},"c":-1}'), 3)
    assertEquals(partOne('{"a":[-1,1]}'), 0)
    assertEquals(partOne('[-1,{"a":1}]'), 0)
    assertEquals(partOne('[]'), 0)
    assertEquals(partOne('{}'), 0)
    assertEquals(partOne('[9999]'), 9999)
})()

partTwoEnabled && testsEnabled && (() => {
    assertEquals(partTwo('[1,2,3]'), 6)
    assertEquals(partTwo('[1,{"c":"red","b":2},3]'), 4)
    assertEquals(partTwo('{"d":"red","e":[1,2,3,4],"f":5}'), 0)
    assertEquals(partTwo('[1,"red",5]'), 6)
})()

// --- End Tests

partOneEnabled && runAndTime('partOne', () => partOne(input))
partTwoEnabled && runAndTime('partTwo', () => partTwo(input2))