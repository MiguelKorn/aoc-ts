import {assertEquals} from "https://deno.land/std@0.112.0/testing/asserts.ts";
import {getEnabledParts, getInput, getLeastCommonMultiple, runAndTime} from "../../utils/utils.ts";

const [partOneEnabled, partTwoEnabled, testsEnabled] = getEnabledParts()
const [input, input2] = await getInput()

type Op = (old: number) => number

type Monkey = {
    items: Array<number>
    newItem: Op,
    divisibleBy: number,
    ifTrue: number,
    ifFalse: number,
    total: number,
}

const solve = (i: string, rounds = 20, divide = true) => {
    const monkeyRegex = /:(.+)\n.+old(.+)\n.+by (\d+)\n.+(\d+)\n.+(\d+)/
    const s: Record<string, Op | ((n: number) => Op)> = {
        "*": (num) => (old) => old * num,
        "+": (num) => (old) => old + num,
        "*o": (old) => old * old,
        "+o": (old) => old + old,
    }
    const monkeys = i.split("\n\n").map((monkey) => {
        const [_, items, operation, test, ifTrue, ifFalse] = monkey.match(monkeyRegex)!
        const [__, op, amount] = operation.split(" ")

        return {
            items: items.split(",").map(Number),
            newItem: amount.charAt(0) === "o" ? s[op + 'o'] : s[op](+amount),
            divisibleBy: +test,
            ifTrue: +ifTrue,
            ifFalse: +ifFalse,
            total: 0,
        } as Monkey
    })

    const lcm = getLeastCommonMultiple(monkeys.map(m => m.divisibleBy))

    for (let j = 0; j < rounds; j++) {
        for (let k = 0; k < monkeys.length; k++) {
            const {items, newItem, divisibleBy, ifTrue, ifFalse} = monkeys[k]
            while (items.length > 0) {
                const value = newItem(items.shift()!)
                let newValue = value % lcm
                if (divide) newValue = Math.floor(newValue / 3)
                const newMonkey = newValue % divisibleBy === 0 ? ifTrue : ifFalse
                monkeys[newMonkey].items.push(newValue)
                monkeys[k].total++
            }
        }
    }

    const [h1, h2] = monkeys.map(m => m.total).sort((a, b) => b - a)
    return h1 * h2
}
const partOne = (i: string): number => {
    return solve(i)
}
const partTwo = (i: string): number => {
    return solve(i, 10000, false)
}

// --- Tests

const testInput = "Monkey 0:\n" +
    "  Starting items: 79, 98\n" +
    "  Operation: new = old * 19\n" +
    "  Test: divisible by 23\n" +
    "    If true: throw to monkey 2\n" +
    "    If false: throw to monkey 3\n" +
    "\n" +
    "Monkey 1:\n" +
    "  Starting items: 54, 65, 75, 74\n" +
    "  Operation: new = old + 6\n" +
    "  Test: divisible by 19\n" +
    "    If true: throw to monkey 2\n" +
    "    If false: throw to monkey 0\n" +
    "\n" +
    "Monkey 2:\n" +
    "  Starting items: 79, 60, 97\n" +
    "  Operation: new = old * old\n" +
    "  Test: divisible by 13\n" +
    "    If true: throw to monkey 1\n" +
    "    If false: throw to monkey 3\n" +
    "\n" +
    "Monkey 3:\n" +
    "  Starting items: 74\n" +
    "  Operation: new = old + 3\n" +
    "  Test: divisible by 17\n" +
    "    If true: throw to monkey 0\n" +
    "    If false: throw to monkey 1"

partOneEnabled && testsEnabled && (() => {
    assertEquals(partOne(testInput), 10605)
})()

partTwoEnabled && testsEnabled && (() => {
    assertEquals(partTwo(testInput), 2713310158)
})()

// --- End Tests

partOneEnabled && runAndTime('partOne', () => partOne(input))
partTwoEnabled && runAndTime('partTwo', () => partTwo(input2))