import { parse } from "https://deno.land/std@0.112.0/flags/mod.ts";
import { exists, ensureFile, copy, ensureDir } from "https://deno.land/std@0.112.0/fs/mod.ts";
import * as log from "https://deno.land/std@0.112.0/log/mod.ts";
import Ask from "https://deno.land/x/ask@1.0.6/mod.ts";

const ask = new Ask()

const { y, d, p } = parse(Deno.args);

const puzzlePath = `./${y}/day_${d}/`
const scriptPath = puzzlePath + 'index.ts'
const inputPath = puzzlePath + 'input.txt'

const templatePath = './template/day/'

const scriptPathExists = await exists(scriptPath)
const inputPathExists = await exists(inputPath)

if (!scriptPathExists || !inputPathExists) {
    log.error(`Puzzle with year: ${y} and ${d} does not exist!`)
    const { generate } = await ask.confirm({
        type: 'confirm',
        name: 'generate',
        message: 'Do you want to generate them?'
    })

    if (!generate) Deno.exit()

    ensureDir(puzzlePath)
    ensureDir(puzzlePath)

    copy(templatePath + 'index.ts', scriptPath)
    copy(templatePath + 'input.txt', inputPath)
}

const cmd = ['deno', 'run', '--allow-read', scriptPath, '-i', inputPath]

if (p) cmd.push('-p', p)

const puzzle = Deno.run({ cmd })

await puzzle.status()