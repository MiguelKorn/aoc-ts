import { assertEquals } from "https://deno.land/std@0.112.0/testing/asserts.ts";
import { getEnabledParts, getInput, runAndTime } from "../../utils/utils.ts";

const [partOneEnabled, partTwoEnabled, testsEnabled] = getEnabledParts()
const [input, input2] = await getInput()

const partOne = (i: string): number => {
    let marker = 0
    for (let j = 0; j < i.length; j++) {
        const set = new Set(i.slice(j, j+4).split(''))
        if(set.size === 4) {
            marker = j + 4
            break
        }
    }

    return marker
}
const partTwo = (i: string): number => {
    let marker = 0
    for (let j = 0; j < i.length; j++) {
        const set = new Set(i.slice(j, j+14).split(''))
        if(set.size === 14) {
            marker = j + 14
            break
        }
    }

    return marker
}

// --- Tests

const testInput = "mjqjpqmgbljsphdztnvjfqwrcgsmlb"

partOneEnabled && testsEnabled && (() => {
    assertEquals(partOne(testInput), 7)
    assertEquals(partOne("bvwbjplbgvbhsrlpgdmjqwftvncz"), 5)
    assertEquals(partOne("nppdvjthqldpwncqszvftbrmjlhg"), 6)
    assertEquals(partOne("nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg"), 10)
    assertEquals(partOne("zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw"), 11)
})()

partTwoEnabled && testsEnabled && (() => {
    assertEquals(partOne(testInput), 19)
    assertEquals(partOne("bvwbjplbgvbhsrlpgdmjqwftvncz"), 23)
    assertEquals(partOne("nppdvjthqldpwncqszvftbrmjlhg"), 23)
    assertEquals(partOne("nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg"), 29)
    assertEquals(partOne("zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw"), 26)
})()

// --- End Tests

partOneEnabled && runAndTime('partOne', () => partOne(input))
partTwoEnabled && runAndTime('partTwo', () => partTwo(input2))