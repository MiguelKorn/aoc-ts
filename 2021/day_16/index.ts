import { assertEquals } from "https://deno.land/std@0.112.0/testing/asserts.ts";
import { getEnabledParts, getInput, runAndTime } from "../../utils/utils.ts";

const [partOneEnabled, partTwoEnabled, testsEnabled] = getEnabledParts()
const [input, input2] = await getInput()

const parse = (s: string): number[] => {
    let version = parseInt(s.slice(0, 3), 2);
    const id = parseInt(s.slice(3, 6), 2);

    let total = 0
    const packets = []
    if (id === 4) {
        let i = 6
        let n = s.slice(i + 1, i + 5)
        while (s[i] !== '0') {
            i += 5
            n += s.slice(i + 1, i + 5)
        }
        return [version, i + 5, parseInt(n, 2)]
    }

    let isZero = s[6] === '0'
    const l = parseInt(s.slice(7, isZero ? 22 : 18), 2)
    let c = isZero ? 0 : 18;
    for (let i = 0; (isZero ? c : i) < l; i++) {
        const [v, i, n] = parse(s.slice((isZero ? 22 : 0) + c))
        version += v
        c += i
        packets.push(n)
    }
    total = isZero ? (22 + l) : c

    const ops: { [key: number]: (p: number[]) => number } = {
        0: (p) => p.reduce((a, b) => a + b, 0),
        1: (p) => p.reduce((a, b) => a * b, 1),
        2: (p) => p.reduce((a, b) => Math.min(a, b)),
        3: (p) => p.reduce((a, b) => Math.max(a, b)),
        5: (p) => (p[0] > p[1]) ? 1 : 0,
        6: (p) => (p[0] < p[1]) ? 1 : 0,
        7: (p) => (p[0] == p[1]) ? 1 : 0,
    }

    return [version, total, ops[id](packets)]
}

const partOne = (i: string, p2 = false): number => {
    // const bin = parseInt(i, 16).toString(2)
    const bin = i.split('').map(c => parseInt(c, 16).toString(2).padStart(4, "0")).join('')
    return parse(bin)[p2 ? 2 : 0]
}
const partTwo = (i: string): number => {
    return partOne(i, true)
}

// --- Tests

partOneEnabled && testsEnabled && (() => {
    assertEquals(partOne('D2FE28'), 6)
    assertEquals(partOne('8A004A801A8002F478'), 16)
    assertEquals(partOne('620080001611562C8802118E34'), 12)
    assertEquals(partOne('C0015000016115A2E0802F182340'), 23)
    assertEquals(partOne('A0016C880162017C3686B18A3D4780'), 31)
})()

partTwoEnabled && testsEnabled && (() => {
    assertEquals(partTwo('C200B40A82'), 3)
    assertEquals(partTwo('04005AC33890'), 54)
    assertEquals(partTwo('880086C3E88112'), 7)
    assertEquals(partTwo('CE00C43D881120'), 9)
    assertEquals(partTwo('D8005AC2A8F0'), 1)
    assertEquals(partTwo('F600BC2D8F'), 0)
    assertEquals(partTwo('9C005AC2F8F0'), 0)
    assertEquals(partTwo('9C0141080250320F1802104A08'), 1)
})()

// --- End Tests

partOneEnabled && runAndTime('partOne', () => partOne(input))
partTwoEnabled && runAndTime('partTwo', () => partTwo(input2))