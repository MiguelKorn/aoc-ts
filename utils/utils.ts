type EnabledPartsReturn = [partOneEnabled: boolean, partTwoEnabled: boolean, testsEnabled: boolean]
export const getEnabledParts = (): EnabledPartsReturn => ([
    Deno.args.includes('-p1'),
    Deno.args.includes('-p2'),
    Deno.args.includes('-t')
])

export const runAndTime = <T = unknown>(label: string, cb: () => T): T => {
    console.time(label)
    const result = cb();
    console.timeEnd(label)
    console.log(`Solution to ${label}: ${result}`)
    return result
}

export const getInput = async () => {
    const i = await Deno.readTextFile(Deno.args[1])
    return [i, Deno.args.includes('-i2') ? await Deno.readTextFile(Deno.args[3]) : i]
}

export const createGrid = (cols: number, rows: number = cols, fill: any = 0) => Array(cols).fill(null).map(() => Array(rows).fill(fill))

export const range = (start: number, end: number) => Array.from({ length: end - start }, (_, i) => start + i)

// https://www.baeldung.com/cs/array-generate-all-permutations#quickperm-algorithm
type CreatePermutations<T = string | number> = (arr: T[], partial?: boolean) => T[][]
export const createPermutations: CreatePermutations = (arr, partial = false) => {
    const permutations = [[...arr]]
    const N = arr.length - (partial ? 1 : 0);
    const currentPerm: number[] = [...Array(N + 1).keys()]

    let i = 1;
    while (i < N) {
        currentPerm[i] -= 1;
        const j = (i % 2 == 1) ? currentPerm[i] : 0;
        [arr[j], arr[i]] = [arr[i], arr[j]] // swap
        permutations.push([...arr])
        i = 1
        while (currentPerm[i] == 0) {
            currentPerm[i] = i++;
        }
    }

    return permutations;
}