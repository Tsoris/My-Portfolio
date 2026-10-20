---
title: 'Analysis of Algorithms: Dynamic Programming'
date: '2026-10-19'
excerpt:
  'Notes on dynamic programming, overlapping subproblems, and solving Fibonacci
  with top-down memoization and bottom-up tabulation.'
readTime: '6 min read'
series:
  name: 'Analysis of Algorithms'
  order: 4
tags:
  - Analysis of Algorithms
  - Dynamic Programming
  - Computer Science
  - Learning
---

## Introduction

In module 4 of CS 325, we are covering dynamic programming. This post brings
together my notes as I work through the material. Each section focuses on a
specific topic, so you can read in order or review the sections that interest
you. I am starting with the foundations and using Fibonacci to compare the two
main approaches.

## In This Post

- [Dynamic programming fundamentals](#what-is-dynamic-programming)
- [Top-down memoization](#top-down-approach-memoization)
- [Bottom-up tabulation](#bottom-up-approach-tabulation)
- [Longest common subsequence — under construction](#longest-common-subsequence-problem)

## Questions to Keep in Mind

- What is dynamic programming?
- When is it useful?
- How do top-down and bottom-up approaches differ?
- How do we analyze their time and space complexity?

## What Is Dynamic Programming?

Dynamic programming solves a problem by breaking it into smaller subproblems,
storing their solutions, and reusing those results instead of recalculating
them. Two important ideas are overlapping subproblems and optimal substructure.

**Overlapping subproblems** means that the same subproblem appears multiple
times while solving the original problem. Computing a Fibonacci term with
straightforward recursion is an example: the same smaller terms are requested
repeatedly.

**Optimal substructure** means that an optimal solution can be constructed from
optimal solutions to smaller subproblems. This is especially relevant to
optimization problems such as knapsack. Dynamic programming also applies to
counting and decision problems, so finding a minimum or maximum is not a
requirement. Fibonacci illustrates reusing subproblem solutions without asking
us to choose an optimal solution.

Merge sort is a useful comparison. It sorts separate halves and merges their
results, but its recursive calls operate on distinct portions of the input. The
key distinction is that these subproblems do not overlap, so caching their
results does not avoid repeated work. The need for a combining step does not
itself rule out dynamic programming.

## When to Use Dynamic Programming

These questions help me recognize when dynamic programming might be useful:

- Can I describe the problem using smaller subproblems, with clear base cases?
- Do the same subproblems repeat?
- Can I build a solution from the stored results of those subproblems?
- If the problem asks for an optimum, does it have optimal substructure?

The next step is defining a **state**: the information that identifies one
subproblem. For Fibonacci, the index `n` is enough. More complicated problems
may need several values to identify a state.

## Solving the Fibonacci Sequence Problem

For these examples, I am using the base cases `F(0) = 1` and `F(1) = 1`,
matching my original notes. This gives `1, 1, 2, 3, 5, 8, ...`. Another common
convention starts with `F(0) = 0` and `F(1) = 1`; the recurrence is the same:

```text
F(n) = F(n - 1) + F(n - 2), for n >= 2
```

With straightforward recursion, calculating `F(5)` requests `F(3)` twice and
`F(2)` three times. Even this smaller example shows repeated work:

```text
F(4)
├── F(3)
│   ├── F(2)
│   │   ├── F(1)
│   │   └── F(0)
│   └── F(1)
└── F(2)          ← repeated subproblem
    ├── F(1)
    └── F(0)
```

Dynamic programming avoids recomputing these results. We can approach this with
top-down **memoization** or bottom-up **tabulation**.

## Top-Down Approach: Memoization

Top-down starts with the original problem and recursively solves the smaller
subproblems it needs. Memoization stores each result so later calls can reuse
it. The term is _memoization_, rather than memorization.

For Fibonacci, a dictionary maps each index to its computed value. We begin with
the base cases and fill in other values as needed. These functions assume `n` is
a nonnegative integer.

```python
def fib_top_down(n):
    fib_memo = {0: 1, 1: 1}

    def solve(k):
        if k in fib_memo:
            return fib_memo[k]

        fib_memo[k] = solve(k - 1) + solve(k - 2)
        return fib_memo[k]

    return solve(n)
```

When evaluating a larger term, the first chain of calls eventually reaches
`solve(2)`. Its value is not stored yet, but both base cases are:

```text
F(2) = F(1) + F(0) = 1 + 1 = 2
```

We store `fib_memo[2] = 2`. Later calls to `solve(2)` return that value without
making further recursive calls. Each distinct non-base subproblem is computed
once during this call to `fib_top_down`.

### Top-Down Time and Space Complexity

Standard runtime analysis still applies. However, counting the entire naive
recursion tree would overcount the work because memoization prevents repeated
expansion of the same subproblems.

A useful upper bound is:

```text
number of distinct states computed × maximum work per state
```

Here, work per state includes its transitions and cache lookups, excluding the
work of solving other states that we count separately. If states have different
costs, we can sum their individual costs instead.

Fibonacci has `Θ(n)` states for `n >= 1`. Assuming constant-time arithmetic and
expected constant-time dictionary operations, each new state takes constant
additional work. This gives `Θ(n)` time.

The dictionary uses `O(n)` space. The recursive call stack also reaches `O(n)`
depth, so total auxiliary space is `O(n)`. Memoization avoids repeated
computation, but it does not remove the recursive stack. Python's recursion
limit also makes this implementation unsuitable for very large indices.

## Bottom-Up Approach: Tabulation

Bottom-up starts with the base cases and computes larger subproblems in an order
that ensures their dependencies are already available. For Fibonacci, we
calculate `F(2)`, `F(3)`, and so on until we reach `F(n)`.

This process is called tabulation. The implementation below uses a list as a
table, where index `i` stores `F(i)`:

```python
def fib_bottom_up(n):
    if n <= 1:
        return 1

    fib_table = [0] * (n + 1)
    fib_table[0] = 1
    fib_table[1] = 1

    for i in range(2, n + 1):
        fib_table[i] = fib_table[i - 1] + fib_table[i - 2]

    return fib_table[n]
```

The early return handles both base cases, including `n = 0`, without trying to
write to index `1` of a one-element list. The final answer is stored at index
`n`.

### Bottom-Up Time and Space Complexity

Under the same constant-time arithmetic model, initializing the list and filling
it take `Θ(n)` time for `n >= 1`. The table uses `O(n)` auxiliary space, and
there is no recursive call stack.

Each Fibonacci term depends only on the previous two terms. If we only need the
final value, we could retain those two values instead of the whole table,
reducing auxiliary space to `O(1)` stored numbers.

These complexity bounds use a simplified arithmetic model. Python integers grow
with the Fibonacci values, so addition is not constant-time for arbitrarily
large terms, and even two stored numbers require more bits as `n` grows.

## Comparing the Two Approaches

Top-down computes states as recursive calls request them. Bottom-up computes
states in a planned dependency order. Both reuse earlier results, and both
Fibonacci examples take linear time under the model above.

For this problem, both approaches compute all terms up to `n`. In other
problems, top-down may avoid states that the original problem never needs, while
bottom-up can avoid recursion overhead. Choosing an approach depends on the
dependencies between states and which states we actually need to solve.

## Longest Common Subsequence Problem

> **Under construction:** I am still working through longest common subsequence.
> These are my starting notes; I will add the recurrence, table walkthrough, and
> solution explanation as I develop my understanding.

Here I will explore a classic dynamic programming problem: finding the longest
common subsequence of two strings.

Given two strings, find the length of their longest common subsequence. A
subsequence preserves the relative order of characters but does not need to be
contiguous. If the strings have no characters in common, their longest common
subsequence is the empty sequence, with length `0`.

```text
Input: str1 = "abcdef", str2 = "apceg"
Output: 3

The longest common subsequence is "ace", which has length 3.
```
