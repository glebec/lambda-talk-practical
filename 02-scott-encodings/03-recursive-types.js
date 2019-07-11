/**
 * This technique extends even to recursive data types, allowing us to e.g.
 * define the classic functional *cons* list.
 */

// data List a = Empty | Node a (List a)
const empty =              emptyCase => nodeCase => emptyCase
const node  = a => tail => emptyCase => nodeCase => nodeCase(a)(tail)

const list1 = node(1)(node(2)(node(3)(empty)))
const list2 = node(5)(node(-3)(empty))

const forEach = cb => list => list()(a => tail => {
    cb(a)
    forEach(cb)(tail)
})

const logAll = forEach(el => console.log('el is ' + el))

logAll(list1) // el is 1, el is 2, el is 3
logAll(list2) // el is 5, el is -3

const reduce = reducer => base => list => list(base)(a => tail =>
    reducer (a) (reduce (reducer) (base) (tail))
)

console.log(reduce (a => b => a + b) (0) (list1)) // 6
