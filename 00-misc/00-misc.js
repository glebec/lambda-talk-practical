/**
 * A handful of things you probably already know, which are closely associated
 * with and/or came from the lambda calculus.
 */

// Lambdas! Obviously. They are:
// - first-class
// - anonymous (but can be bound to names in JS)
// - higher-order
// - closures

const id = x => x

// Alpha Equivalence: you can safely refactor by consistently renaming vars,
// if you avoid "variable capture".

const add = (n1, n2) => n1 + n2
const sum = (x1, x2) => x1 + x2

// Eta-reduction: if a function only exists to pass an argument into an inner
// function, and return that result, the function is a useless wrapper.

const log = x => console.log(x) // (does not apply to methods using `this`…)

;[1, 2, 3].forEach(num => log(num)) // eta-expanded
;[1, 2, 3].forEach(log) // eta-reduced

// Eta-expansion: side-effects don't exist in LC, but if you have one that
// you'd rather delay until later, you can wrap it in a thunk!

const effectfulYell = str =>       console.log(str + '!')
const thunkedYell   = str => () => console.log(str + '!') // eta-expanded

const thunk = thunkedYell('hi') // no effect…
thunk() // boom

// Currying and partial application: lets you derive new specific funcss from
// more general funcs. Great for reuse and DRY.

const mult = n1 => n2 => n1 * n2
const double = mult(2)
const triple = mult(3)
const something = triple(double(5))

// Combinators – work like PB & J with curried funcs!

const div = num => den => num/den
const brokenHalf = div(2)
console.log(brokenHalf(10)) // 0.2 – wrong

const flip = fn => a => b => fn(b)(a)
const half = flip(div)(2)
console.log(half(10)) // 5
