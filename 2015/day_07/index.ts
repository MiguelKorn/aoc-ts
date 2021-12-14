import { assertEquals } from "https://deno.land/std@0.112.0/testing/asserts.ts";
import { getEnabledParts, getInput, runAndTime } from "../../utils/utils.ts";

const [partOneEnabled, partTwoEnabled, testsEnabled] = getEnabledParts()
const [input, input2] = await getInput()

type Operator = (a: number, b: number) => number

const partOne = (input: string, startMap?: Map<string, number>): Map<string, number> => {
    const m = new Map<string, number>([...(startMap || [])]);
    let ins = input.split('\n')

    const get = (n: string): number | undefined => !isNaN(+n) ? +n : m.get(n)
    const OR: Operator = (a, b) => a | b
    const AND: Operator = (a, b) => a & b
    const LSHIFT: Operator = (a, b) => a << b
    const RSHIFT: Operator = (a, b) => a >> b

    while (!m.get('a') && ins.length !== 0) {
        ins.forEach((v, id) => {
            const [_, a, b, c, d, e, f] = v.match(/(\w+|(\w+) (\w+) (\w+)|NOT (\w+)) -> (.+)/)!
            const [valA, valB, valD] = [get(a), get(b), get(d)]
            const bd = valB !== undefined && valD !== undefined

            if (valA !== undefined && !m.has(f)) m.set(f, valA)
            else if (e && m.has(e)) m.set(f, 65536 + ~m.get(e)!)
            else if (c === 'LSHIFT' && bd) m.set(f, LSHIFT(valB!, valD!))
            else if (c === 'RSHIFT' && bd) m.set(f, RSHIFT(valB!, valD!))
            else if (c === 'AND' && bd) m.set(f, AND(valB!, valD!))
            else if (c === 'OR' && bd) m.set(f, OR(valB!, valD!))
            else return

            ins.splice(id, 1);
        })
    }

    return m
}
const partTwo = (input: string): Map<string, number> => {
    return partOne(input, new Map([['b', partOne(input).get('a')!]]))
}

// --- Tests

partOneEnabled && testsEnabled && (() => {
    assertEquals(
        partOne('456 -> y\nx AND y -> d\nx OR y -> e\nx LSHIFT 2 -> f\ny RSHIFT 2 -> g\nNOT x -> h\nNOT y -> i\n123 -> x\nh -> a'),
        new Map([["a", 65412], ["d", 72], ["e", 507], ["f", 492], ["g", 114], ["h", 65412], ["i", 65079], ["x", 123], ["y", 456],])
    )
    // assertEquals(1, 0)
})()

partTwoEnabled && testsEnabled && (() => {})()

// --- End Tests

partOneEnabled && runAndTime('partOne', () => partOne(input).get('a'))
partTwoEnabled && runAndTime('partTwo', () => partTwo(input).get('a'))