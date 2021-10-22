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