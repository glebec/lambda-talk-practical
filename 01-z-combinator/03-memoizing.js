/**
 * A slight detour, primitive recursive fibonacci is well-known to have
 * hideous time complexity at `O(n!)`.
 */

let callCount = 0

const fib = n => {
    callCount++
    return (n > 2)
        ? fib(n - 1) + fib(n - 2)
        : 1
}

console.log(fib(20)) // 6765
console.log(callCount) // 13529

/**
 * What about memoization? We can do it… but only by *re-writing* the fib
 * function to have memoization inside it, by hand. Hm.
 */


const memo = { 1: 1, 2: 1 }

const handMemoizedFib = n => {
    callCount++
    if (n in memo) return memo[n]
    const result = handMemoizedFib(n - 1) + handMemoizedFib(n - 2)
    memo[n] = result
    return result
}

callCount = 0
console.log(handMemoizedFib(20)) // 6765
console.log(callCount) // 37

/**
 * Why did we have to do it by hand? Can't we write a higher-order memoizer?
 * Let's try it out and see what happens.
 */

const memoize = fn => {
    const thisMemo = {}
    return (arg) => {
        if (arg in thisMemo) return thisMemo[arg]
        const result = fn(arg)
        thisMemo[arg] = result
        return result
    }
}

const autoMemoizedFib = memoize(fib)

/**
 * SEEMS to work at first… after we have computed fib(20) once, the next time
 * is much better!
 */

callCount = 0
console.log(autoMemoizedFib(20)) // 6765
console.log(callCount) // 13529

callCount = 0
console.log(autoMemoizedFib(20)) // 6765
console.log(callCount) // 0

/**
 * BUT… we have a problem. The auto-memoizer cannot peer inside the machinery
 * of `fib` — instead, it treats it as a black box, and only memoizes the
 * result for `20`. It **did not** memoize 1, 2, 3, 4, ... 18, or 19!
 */

callCount = 0
console.log(autoMemoizedFib(19)) // 4181
console.log(callCount) // 8361
