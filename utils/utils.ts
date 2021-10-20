type EnabledPartsReturn = [partOneEnabled: boolean, partTwoEnabled: boolean]
export const getEnabledParts = (): EnabledPartsReturn => {
    const tagIndex = Deno.args.indexOf('-p')
    if (tagIndex === -1) return [true, true]
    const arg = Deno.args[tagIndex + 1]
    return [arg === '1', arg === '2']
}

export const runAndTime = <T = unknown>(label: string, cb: () => T): T => {
    console.time('partOne')
    const result = cb();
    console.timeEnd('partOne')
    console.log(`Solution to ${label}: ${result}`)
    return result
}