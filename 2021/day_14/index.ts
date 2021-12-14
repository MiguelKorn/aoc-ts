import { assertEquals } from "https://deno.land/std@0.112.0/testing/asserts.ts";
import { getEnabledParts, getInput, runAndTime } from "../../utils/utils.ts";

const [partOneEnabled, partTwoEnabled, testsEnabled] = getEnabledParts()
const [input, input2] = await getInput()

const partOne = (i: string, steps: number = 10): number => {
    return partTwo(i, steps)
}
const partTwo = (i: string, steps: number = 40): number => {
    let ins = i.split("\n\n")
    const pairs = new Map(ins[1].split("\n").map(rule => rule.split(" -> ")) as []);

    const t = [...ins[0]]
    const occ = t.reduce((m, c) => m.set(c, (m.get(c) || 0) + 1), new Map())
    let p = t.reduce((m, c, i, a) => {
        if (i < a.length - 1) m.set(c + a[i + 1], (m.get(c + a[i + 1]) || 0) + 1)
        return m
    }, new Map())

    for (let j = 0; j < steps; j++) {
        p = [...p.entries()]
            .reduce((m, [k, c]) => {
                const [a, b] = k
                const d = pairs.get(k)

                occ.set(d, (occ.get(d) || 0) + c)
                const p1 = a + d
                const p2 = d + b
                m.set(p1, (m.get(p1) || 0) + c)
                m.set(p2, (m.get(p2) || 0) + c)
                return m
            }, new Map())
    }

    return Math.max(...occ.values()) - Math.min(...occ.values());
}

// --- Tests

partOneEnabled && testsEnabled && (() => {
    assertEquals(partOne('NNCB\n\n' +
        'CH -> B\n' +
        'HH -> N\n' +
        'CB -> H\n' +
        'NH -> C\n' +
        'HB -> C\n' +
        'HC -> B\n' +
        'HN -> C\n' +
        'NN -> C\n' +
        'BH -> H\n' +
        'NC -> B\n' +
        'NB -> B\n' +
        'BN -> B\n' +
        'BB -> N\n' +
        'BC -> B\n' +
        'CC -> N\n' +
        'CN -> C'), 1588)
})()

partTwoEnabled && testsEnabled && (() => {
    // assertEquals(partTwo(''), 0)
})()

// --- End Tests

partOneEnabled && runAndTime('partOne', () => partOne(input))
partTwoEnabled && runAndTime('partTwo', () => partTwo(input2))