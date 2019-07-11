/**
 * A vanilla recursive factorial function
 */

const fact = n => (n > 1)
    ? n * fact(n - 1)
    : 1

console.log(fact(3)) // 6
console.log(fact(5)) // 120

module.exports = fact
