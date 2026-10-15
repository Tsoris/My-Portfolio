---
title: 'Analysis of Algorithms: Running Time and Recursion'
date: '2026-10-12'
excerpt:
  'A look back at my first two weeks of Analysis of Algorithms, covering
  asymptotic notation, running time, recursion, and recurrence relations.'
readTime: '7 min read'
series:
  name: 'Analysis of Algorithms'
  order: 1
tags:
  - Analysis of Algorithms
  - Computer Science
  - Learning
  - CS Fundamentals
---

## Why I Am Starting This Series

I am currently in week three of my Analysis of Algorithms course, and I wanted
to start documenting what I am learning. I originally planned to wait until we
got into specific algorithms, but I figured the foundations we have covered so
far deserve their own post.

This introduction looks back at the first two weeks: asymptotic notation and
running time, followed by recursion and recurrence relations. I want this series
to be a place where I can summarize the material and build on it as the course
progresses.

## Running Time: How Much Work Does an Algorithm Do?

Running time analysis looks at how the amount of work an algorithm performs
changes as its input grows. Measuring seconds can be useful, but those results
depend on the hardware, programming language, and other conditions. Counting
operations gives us a way to reason about growth without tying the explanation
to one particular machine.

For example, consider a loop that visits each element of an array once. If the
array contains `n` elements and each visit takes constant work, the total work
grows linearly with `n`. Doubling the input roughly doubles the work.

If we instead use two nested loops that each run `n` times, with constant work
inside the inner loop, we perform `n * n` iterations. That produces quadratic
growth. The difference becomes more significant as the input gets larger.

## Asymptotic Notation

Asymptotic notation describes growth as the input size becomes large. We set
aside constant factors and lower-order terms to focus on the part of the running
time that eventually dominates.

For example, a running time of `3n² + 5n + 2` has quadratic growth. The constant
multiplier and the smaller terms still affect the actual amount of work, but we
describe its asymptotic growth as `Θ(n²)`.

The three notations we have covered are:

- **Big O, `O(f(n))`:** an asymptotic upper bound on growth.
- **Big Omega, `Ω(f(n))`:** an asymptotic lower bound on growth.
- **Big Theta, `Θ(f(n))`:** a tight bound, meaning both an upper and a lower
  bound of the same order.

These bounds hold up to positive constant factors for sufficiently large inputs.
A tight bound gives a more precise description than an upper bound alone. For
instance, a linear function is both `O(n)` and `O(n²)`, but `Θ(n)` captures its
growth more closely.

Another distinction is that Big O does not automatically mean worst-case running
time. Best case, average case, and worst case describe which inputs we are
analyzing. Asymptotic notation describes bounds on the resulting running-time
function.

## Recursion

A recursive procedure calls itself on a smaller or simpler instance of a
problem. It needs a base case that can be handled directly, and its recursive
calls must make progress toward that base case.

Factorial is a simple example. For a nonnegative integer `n`, we can define
`factorial(0) = 1` and otherwise compute `n * factorial(n - 1)`.

```text
factorial(n):
    if n == 0:
        return 1
    return n * factorial(n - 1)
```

Each call reduces `n` by one until it reaches zero. To analyze the total work,
we need to account for all of those calls, not just the work visible in a single
call.

## Recurrence Relations

A recurrence relation expresses a problem's running time in terms of the running
time for smaller inputs. It connects the structure of recursive code to an
expression we can analyze.

Under a simplified model where multiplication takes constant time, the factorial
procedure above has the recurrence:

```text
T(0) = Θ(1)
T(n) = T(n - 1) + Θ(1)
```

The `T(n - 1)` term represents the recursive call. The additional `Θ(1)`
represents the constant amount of work performed by the current call. Expanding
the recurrence gives one constant amount of work per level, across `n + 1`
calls, so the total running time is `Θ(n)` in this model. With arbitrary-size
integers, multiplication becomes more expensive as the numbers grow, so that
assumption matters.

This example also shows why recursion does not automatically imply exponential
running time. The number of recursive calls and how their input sizes change
both matter. A recurrence makes those details explicit.

### The Recursion Tree Method

We covered two methods for solving recurrences: the recursion tree method and
the master method. A recursion tree makes the work visible by representing each
recursive call as a node. Each node records the work done by that call outside
its recursive calls. We then add the work across each level and sum the levels,
including the leaves.

For example, consider this recurrence, assuming `n` is a power of two:

```text
T(1) = Θ(1)
T(n) = 2T(n / 2) + n
```

The root does `n` work and creates two subproblems of size `n / 2`. Each of
those does `n / 2` work, so the next level also contributes `n` in total.

```text
Level     |          Tree              |     Cost
------------------------------------------------------
Level 0:  |           n                |    total: n
Level 1:  |      n/2       n/2         |    total: n
Level 2:  |   n/4  n/4   n/4  n/4      |    total: n
...       |                            |
Leaves:   |   n calls of constant work |   total: Θ(n)
```

At level `i`, there are `2^i` subproblems of size `n / 2^i`. Multiplying those
together gives `n` work per internal level. We reach the base case after
`log₂(n)` splits, so the internal levels contribute `n log₂(n)` work. Adding the
`Θ(n)` leaf cost gives a total running time of `Θ(n log n)`.

The recursion tree turns the recurrence into a summation: the total running time
is the sum of the work performed across all recursive calls. Grouping those
calls by level lets us add the work one level at a time. For this example, let
`h = log₂(n)`. Then:

```text
T(n) = Σ (from i = 0 to h - 1) [2^i · (n / 2^i)] + Θ(n)
     = Σ (from i = 0 to h - 1) n + Θ(n)
     = n log₂(n) + Θ(n)
     = Θ(n log n)
```

The summation adds the work at the internal levels, and the final `Θ(n)` term
accounts for all the leaves. This is how we move from describing the recursive
steps to calculating their total cost.

The tree helps explain where the bound comes from: the work at each level and
the number of levels both matter. For other recurrences, the work per level may
increase or decrease, so we need to sum those costs rather than assume every
level contributes the same amount.

### The Master Method

The master method gives a way to solve recurrences of the form:

```text
T(n) = aT(n / b) + f(n)
```

Here, `a >= 1` is the number of recursive subproblems, `b > 1` is the constant
factor by which their input size shrinks, and `f(n)` is the work outside the
recursive calls. With constant-time base cases, we compare `f(n)` with
`n^(log_b(a))`.

In the basic three-case version, let `p = log_b(a)`:

- If `f(n) = O(n^(p - ε))` for some constant `ε > 0`, then `T(n) = Θ(n^p)`. The
  work near the leaves dominates.
- If `f(n) = Θ(n^p)`, then `T(n) = Θ(n^p log n)`. The levels contribute
  comparable amounts of work.
- If `f(n) = Ω(n^(p + ε))` for some constant `ε > 0`, and `a f(n / b) <= c f(n)`
  for some constant `c < 1` and all sufficiently large `n`, then
  `T(n) = Θ(f(n))`. The work near the root dominates.

That last condition is the regularity condition. The polynomial gap in the first
and third cases also matters; simply being smaller or larger is not enough to
apply those cases.

For our example, `a = 2`, `b = 2`, and `f(n) = n`. Since `n^(log₂(2)) = n`, the
second case applies and gives `Θ(n log n)`, matching the recursion tree.

The master method does not apply to every recurrence. For example, the factorial
recurrence reduces the input by one rather than dividing it by a constant
factor, so it does not fit this form. Recognizing the structure of a recurrence
is part of choosing how to solve it.

## What Comes Next

The first two weeks establish a way to describe how an algorithm's work grows
and how to account for recursive calls. I will keep returning to these ideas as
we study specific algorithms.

We are now moving into algorithm correctness and divide and conquer. Those will
be the focus of my next post as I work through the current material.
