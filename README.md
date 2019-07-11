# "Practical" Lambda Calculus

Code demonstrations for talk

## 00 Misc

A small smattering of things which are classically associated with or even originated in the lambda calculus, and which have become staples of mainstream programming and/or the functional programming paradigm. Do these count as "practical" lambda calculus? In a way, any time you are working with functions, you are "doing" practical LC.

## 01 The Z Combinator

Heavily inspired by Bruce J. McAdam's 1997 paper "That About Wraps It Up: Using FIX to Handle Errors Without Exceptions, and Other Programming Tricks".

JS has recursion natively, which most of the time is more than enough. But sometimes recursion's "black box" nature makes it annoying to decorate with e.g. logging, value collection, memoization etc.

Fixed-point combinators like `Y` invent recursion from scratch. The JS-compatible version of the `Y`-combinator is the `Z` combinator. We can re-write our recursive functions as pseudo-recursive "functorials", which can be decorated with custom logic without polluting our problem domain logic. The `Z` combinator then does the recursive plumbing for us.

## 02 Scott Encodings

JS has built-in syntaxes and data structures which map well to inventing _product types_ in type theory. In a product type, a piece of data holds other data in "and" fashion – e.g. a Person is a combination of name _and_ age. Unfortunately, JS lacks convenient support for inventing _sum types_, in which data is separated in _or_ fashion – e.g., a direction is North _or_ South. To work around this, most JS developers re-invent the wheel by reusing existing data types (like strings or booleans) in brittle ways.

Mogensen-Scott encodings are a purely functional way to encode sum and product types, including recursive types, as aggregations of _case-matching functions_. The result is a unified API for modeling domains, in which matching on unknown data forces the user to acknowledge all cases.
