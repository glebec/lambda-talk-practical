const assert = require('assert')

/**
 * https://en.wikipedia.org/wiki/Mogensen%E2%80%93Scott_encoding
 *
 * Mogensen-Scott encodings let us define Algebraic Data Types in terms of
 * _collections of functions_. Each function represents one of the allowed
 * branches of data in the collection. Each function shares the same API.
 *
 * To tell which piece of data you are dealing with, or to convert your data
 * to some other form, you pass in function arguments to handle _each different
 * case_ that you might have on hand. In other words, Scott encodings are a lot
 * like a switch case – or more rather, a form of pattern matching!
 */

/**
 * Sum types are *one of* a number of possible constructors. For example, a
 * boolean is _either_ `tru` **OR** `fls`.
 */

// data Bool = True | False
const tru = truCase => flsCase => truCase
const fls = truCase => flsCase => flsCase

// :: Bool -> Bool
const not = bool => bool(fls)(tru)

assert(not(tru) === fls) // boolean logic works!

/**
 * Similarly, a sign is _either_ `rock`, `paper`, or `scissors`.
 */

// data Sign = Rock | Paper | Scissors
const rock     = rockCase => paperCase => scissorsCase => rockCase
const paper    = rockCase => paperCase => scissorsCase => paperCase
const scissors = rockCase => paperCase => scissorsCase => scissorsCase

// :: Sign -> Sign
const nemesis = sign => sign(paper)(scissors)(rock)

assert(nemesis(rock) === paper)
assert(nemesis(paper) === scissors)
assert(nemesis(scissors) === rock)

// :: Sign -> Sign -> Bool
const wins = s1 => s2 => {
    if (s1 === nemesis(s2)) return tru
    return fls
}
assert(wins(paper)(rock) === tru)
assert(wins(rock)(rock) === fls)
assert(wins(rock)(paper) === fls)
