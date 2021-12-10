import { assertEquals } from "https://deno.land/std@0.112.0/testing/asserts.ts";
import { getEnabledParts, getInput, runAndTime } from "../../utils/utils.ts";

const [partOneEnabled, partTwoEnabled, testsEnabled] = getEnabledParts()
const [input, input2] = await getInput()

const contains = (l: string[], s: string): string => l.find(x => s.split('').every(y => x.includes(y)))!

const partOne = (i: string): number => {
    const lines = i.split("\n").map(l => l.split(' | '))
    let total = new Array(10).fill(0)
    lines.forEach(l => {
        const s = l[0].split(' ').map(s => s.split('').sort().join('')).sort((a, b) => a.length > b.length ? 1 : -1)
        const n = l[1].split(' ').map(s => s.split('').sort().join('')).filter(s => s.length == 2 || s.length == 4 || s.length == 3 || s.length == 7)
        n.forEach(t => {
            const idx = s.findIndex(s => s === t)
            total[idx] += 1
        })
    })
    return total.reduce((a, b) => a + b,0)
}
const partTwo = (i: string): number => {
    const lines = i.split("\n").map(l => l.split(' | '))
    let total = new Array(lines.length).fill(0)
    lines.forEach(l => {
        let s = new Array(10).fill(0)
        const [x0,x1,x2,x3,x4,x5,x6,x7,x8,x9] = l[0].split(' ').map(s => s.split('').sort().join('')).sort((a, b) => a.length > b.length ? 1 : -1)
        s[1] = x0
        s[7] = x1
        s[4] = x2
        s[8] = x9
        let n5 = [x3,x4,x5]
        let n6 = [x6,x7,x8]
        s[3] = contains(n5, x0)
        n5 = n5.filter(x => x!=s[3])
        s[9] = contains(n6, s[3])
        n6 = n6.filter(x => x!=s[9])
        s[0] = contains(n6, x0)
        n6 = n6.filter(x => x!=s[0])
        s[6] = n6[0]
        s[5] = n5.find(x => x.split('').every((y: string) => s[6].includes(y)))
        n5 = n5.filter(x => x!=s[5])
        s[2] = n5[0]

        const n = l[1].split(' ').map(s => s.split('').sort().join(''))
        const x = n.map(a => s.findIndex(f => f === a)).join('')
        total.push(Number(x))
    })
    return total.reduce((a, b) => a + b,0)

    return 0
}

// --- Tests

partOneEnabled && testsEnabled && (() => {
    // assertEquals(partOne('acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cdfeb fcadb cdfeb cdbaf'), 26)
    assertEquals(partOne('be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe\n' +
        'edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc\n' +
        'fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg\n' +
        'fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb\n' +
        'aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea\n' +
        'fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb\n' +
        'dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe\n' +
        'bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef\n' +
        'egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb\n' +
        'gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce'), 26)
})()

partTwoEnabled && testsEnabled && (() => {
    assertEquals(partTwo('acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cdfeb fcadb cdfeb cdbaf'), 5353)
    assertEquals(partTwo('be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe\n' +
        'edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc\n' +
        'fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg\n' +
        'fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb\n' +
        'aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea\n' +
        'fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb\n' +
        'dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe\n' +
        'bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef\n' +
        'egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb\n' +
        'gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce'), 61229)
})()

// --- End Tests

partOneEnabled && runAndTime('partOne', () => partOne(input))
partTwoEnabled && runAndTime('partTwo', () => partTwo(input2))