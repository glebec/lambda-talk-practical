/**
 * The Z-combinator, a thunked (lazy) version of the famous Y-combinator.
 *
 * The vanilla Y-combinator does not terminate in JS's strict evaluation. The
 * Z-combinator wraps the "infinite" part of the Y-combinator in a function
 * body, so the pseudo-recursive function we feed to it can invoke the next
 * step only if necessary.
 */

const Z = pseudoRec =>
    (x => pseudoRec(v => x(x)(v)))(x => pseudoRec(v => x(x)(v)))
//                  \__________/
//                       |
//              lazy part of Z combinator, thing that runs "next step"

/**
 * the Z combinator can also be made a little more terse using the Mockingbird:
 */

const M = f => f(f)
const z = pseudoRec => M(x => pseudoRec(v => M(x)(v)))

/**
 * Finally, we can cheat in JS and use actual recursion for a much simpler
 * _fixed point_ combinator which behaves like Z. However, just to prove a
 * point, we will use the canonical Z combinator itself in upcoming examples.
 */

const fix = pseudoRec => v => pseudoRec(fix(pseudoRec))(v)

module.exports = Z
