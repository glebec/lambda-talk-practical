const assert = require('assert')

/**
 * Product types are combinations of other types in "and" fashion. For example,
 * a Coordinate is a Number **AND** a Number.
 */

// data Coord = Coord Number Number
const coord = num1 => num2 => coordCase => coordCase(num1)(num2)

const origin = coord(0)(0)
const unit = coord(1)(1)
const other = coord(-3)(5)

// :: Coord -> Number
const getX = c => c(x => y => x)
const getY = c => c(x => y => y)

// :: Coord -> Coord -> Number
const distance = c1 => c2 => {
    const x = Math.abs(getX(c1) - getX(c2))
    const y = Math.abs(getY(c1) - getY(c2))
    return Math.sqrt(x**2 + y**2)
}

assert(distance(origin)(unit) === Math.sqrt(2))
assert(distance(unit)(other) === 5.656854249492381)

/**
 * Similarly, a Person is a Name (string) and an Age (int)
 */

const person = name => age => personCase => personCase(name)(age)

const getName = person => person(name => age => name)
const getAge = person => person(name => age => age)

const president = person('Lincoln')(56)

assert(getName(president)[0] === 'L')
assert(getAge(president) / 2 === 28)
