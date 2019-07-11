/**
 * So what do we do? We need for our higher-order memoizing wrapper to somehow
 * "know about" each step in the recursion, so it can decorate that recursion
 * with our desired enhancements. But that is precisely what the Z combinator
 * does – wire up recursion steps.
 */

const Z = require('./00-z-combinator')

/**
 * Instead of a black box, we have functions defined in terms of a single
 * recursive step, which receive their next step as an input. We can pass such
 * functions to decorators which return _new_ pseudo-recursive functions.
 */

// signature for decorators is `:: pseudoRec => stepFn => nextVal => result`
// the result is acquired, if desired, by calling `pseudoRec(stepFn)(nextVal)`

const logDecorator = pseudoRec => stepFn => nextVal => {
    console.log(nextVal)
    return pseudoRec(stepFn)(nextVal)
}

const collectorDecorator = arr => pseudoRec => stepFn => nextVal => {
    const result = pseudoRec(stepFn)(nextVal)
    arr.push(result)
    return result
}

// const

/**
 * For example, we decorate our pseudo-factorial with logging and collection!
 * (run this example in a real console, Quokka is weird about log format.)
 */

const vals = []

const pseudoFact = step => n => (n > 1)
    ? n * step(n - 1)
    : 1

const loggingFact = Z(logDecorator(pseudoFact))
console.log(loggingFact(5)) // 120 // logs 5, 4, 3, 2, 1

const collectingFact = Z(collectorDecorator(vals)(pseudoFact))
console.log(collectingFact(5)) // 120
console.log(vals) // [1, 2, 6, 24, 120]

// Notice that the problem domain is totally separate from the decoration

/**
 * Amazingly, we can even "stack" decorators. This works because our decorators
 * take pseudo-recursive functions and return pseudo-recursive functions.
 */

const moreVals = []

const loggingCollectingFact = Z(
    logDecorator(
        collectorDecorator(moreVals)(
            pseudoFact
        )
    )
)

console.log(loggingCollectingFact(5)) // 120 // logs (5, 4, 3, 2, 1) & collects
console.log(moreVals) // [1, 2, 6, 24, 120]
