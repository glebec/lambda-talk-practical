/**
 * Alternative factorial definition via Z combinator
 */

const Z = require('./00-z-combinator')

/**
 * Instead of a recursive definition, we use a "functorial" or "pseudo-
 * recursive" definition, in which the next step to take is a **parameter**
 * instead of a lexically recursive reference.
 */

// const fact = n => (n > 1)
//     ? n * fact(n - 1)
//     : 1

const pseudoFact = step => n => (n > 1)
    ? n * step(n - 1)
    : 1

/**
 * We then "wire up" the recursion using the Z combinator. Notice:
 *
 * - The Z combinator itself is not defined recursively
 * - Our pseudo-recursive function is not defined recursively
 * - The Z combinator is defined in terms of the pseudo-recursive input, but…
 * - …the pseudo-recursive input is not defined in terms of Z. Therefore…
 * - We do not have lexical recursion, nor explicit mutual recursion.
 *
 * Yet almost-magically, the Z combinator "invents" recursion out of thin air!
 */

const fact = Z(pseudoFact)

console.log(fact(3)) // 6
console.log(fact(5)) // 120
