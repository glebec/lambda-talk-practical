/* eslint-disable handle-callback-err */

/**
 * So far it is not entirely clear why we would ever use this in JS. However,
 * things begin to get more complex when we want _sum types of product types_.
 * JS has convenient data structures for product types – e.g. Objects and
 * Arrays – but no built-in way to express sums. Scott encoding gives a single
 * unified API for both sums and products which work together seamlessly.
 */

// data Response = Error StatusNum | Response StatusNum BodyStr
const err = status =>         errCase => resCase => errCase(status)
const res = status => body => errCase => resCase => resCase(status)(body)

const res1 = err(404)
const res2 = res(201)('{ "id": 5 }')
const res3 = res(200)('success')

;[res1, res2, res3].forEach(resp => {
    resp(status => {
        console.log('error: ' + status)
    })(status => body => {
        console.log(`response ${status}: ${body}`)
    })
})

// data Maybe a = Nothing | Just a
const nothing =      nothingCase => justCase => nothingCase
const just    = a => nothingCase => justCase => justCase(a)

const safeDivide = num1 => num2 => {
    if (num2 === 0) return nothing
    return just(num1 / num2)
}

const quotient1 = safeDivide(5)(2)
const quotient2 = safeDivide(3)(0)

const maybeQuotientString = q => q(
    "Error: no result"
)(
    num => `Result: ${num}`
)

console.log(maybeQuotientString(quotient1)) // Result: 2.5
console.log(maybeQuotientString(quotient2)) // Error: no result
