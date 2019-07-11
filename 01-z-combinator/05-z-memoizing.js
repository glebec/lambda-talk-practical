/**
 * With decoration of pseudo-recursive functions in our toolbelt, let's return
 * to the issue of memoization.
 */

const Z = require('./00-z-combinator')

const memoizeDecorator = rec => {
    const memo = {}

    return stepFn => nextVal => {
        if (nextVal in memo) return memo[nextVal]
        const result = rec(stepFn)(nextVal)
        memo[nextVal] = result
        return result
    }
}

/**
 * Instead of manually injecting the counting code, let's create an
 * incrementation decorator.
 */

let callCount = 0
const countDecorator = rec => step => val => {
    callCount++
    return rec(step)(val)
}

/**
 * Our problem domain logic remains totally pristine!
 */

const pseudoFib = step => n => {
    return (n > 2)
        ? step(n - 1) + step(n - 2)
        : 1
}

const memoizedFib = Z(countDecorator(memoizeDecorator(pseudoFib)))

// initially expensive
callCount = 0
console.log(memoizedFib(20)) // 6765
console.log(callCount) // 37

// then memoized...
callCount = 0
console.log(memoizedFib(20)) // 6765
console.log(callCount) // 1

// ...but for ALL recursive calls
callCount = 0
console.log(memoizedFib(19)) // 4181
console.log(callCount) // 1
