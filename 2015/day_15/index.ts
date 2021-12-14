import { assertEquals } from "https://deno.land/std@0.112.0/testing/asserts.ts";
import { createPermutations, getEnabledParts, getInput, runAndTime } from "../../utils/utils.ts";

const [partOneEnabled, partTwoEnabled, testsEnabled] = getEnabledParts()
const [input, input2] = await getInput()

function* subsetSum(numbers: number[], target: number, length: number, partial: number[] = [], partialSum: number = 0): IterableIterator<number[]> {
    if (partialSum === target && partial.length === length) yield partial;
    if (partialSum >= target || partial.length >= length) return;
    for (const [i, n] of numbers.entries()) {
        yield* subsetSum(numbers.slice(i + 1), target, length, partial.concat(n), partialSum + n)
    }
}

type Ingredient = {
    capacity: number,
    durability: number,
    flavor: number,
    texture: number,
    calories?: number
}

const getTotalIngredientValue = (ingredient: Ingredient, amount: number): Ingredient => ({
    capacity: ingredient.capacity * amount,
    durability: ingredient.durability * amount,
    flavor: ingredient.flavor * amount,
    texture: ingredient.texture * amount,
    calories: ingredient.calories! * amount
})

const partOne = (i: string, p2: boolean = false): number => {
    const ingredients = i.split("\n").map(line => {
        const [_, ingredients] = line.split(": ")
        const [capacity, durability, flavor, texture, calories] = ingredients.match(/-?[0-9]/g)!.map(Number)
        return { capacity, durability, flavor, texture, calories }
    })
    const subsets = [...subsetSum([...Array(100).keys()], 100, ingredients.length)]
    return subsets.map(s => createPermutations(s).map(p => {
            const totals = p.map((a, i) => getTotalIngredientValue(ingredients[i], a as number))
                .reduce((a, b) => ({
                    capacity: a.capacity + b.capacity,
                    durability: a.durability + b.durability,
                    flavor: a.flavor + b.flavor,
                    texture: a.texture + b.texture,
                    calories: a.calories! + b.calories!
                }), { capacity: 0, durability: 0, flavor: 0, texture: 0, calories: 0 })
            if (p2 && totals.calories !== 500) return 0
            delete totals.calories
            return Object.values(totals).reduce((a, b) => Math.max(0, a) * Math.max(0, b), 1)
        }
    ))
        .reduce((acc: number[], arr) => acc.concat(...arr), [])
        .reduce((a, b) => a > b ? a : b, 0)
}
const partTwo = (i: string): number => {
    return partOne(i, true)
}

// --- Tests

partOneEnabled && testsEnabled && (() => {
    assertEquals(partOne('Butterscotch: capacity -1, durability -2, flavor 6, texture 3, calories 8\n' +
        'Cinnamon: capacity 2, durability 3, flavor -2, texture -1, calories 3'), 62842880)
})()

partTwoEnabled && testsEnabled && (() => {
    assertEquals(partTwo('Butterscotch: capacity -1, durability -2, flavor 6, texture 3, calories 8\n' +
        'Cinnamon: capacity 2, durability 3, flavor -2, texture -1, calories 3'), 57600000)
})()

// --- End Tests

partOneEnabled && runAndTime('partOne', () => partOne(input))
partTwoEnabled && runAndTime('partTwo', () => partTwo(input2))