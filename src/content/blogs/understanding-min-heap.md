---
title: 'Understanding Min-Heaps'
date: '2026-09-09'
excerpt:
  'How min-heaps use complete binary trees, array indexing, and percolation to
  implement efficient priority queues.'
readTime: '6 min read'
tags:
  - Data Structures
  - CS Fundamentals
  - Min-Heap
  - Priority Queue
---

## Initial Thoughts

I’m starting my data structures revisiting journey with the min-heap, a data
structure that I’m unfamiliar with. I had at least some prior exposure to most
of the other data structures from the course, and I developed some intuition for
how they generally work. At the moment, however, I don’t have a clear mental
model of how a min-heap behaves or what makes it useful.

I don’t recall the implementation being particularly difficult, so developing a
lasting understanding of the min-heap would be a big win for me. Without further
ado, let’s jump into it.

## Min-Heap Introduction

A priority queue is an abstract data type: it describes the behavior we want
without requiring a particular implementation. Unlike a traditional queue, which
follows first in, first out, a priority queue removes elements according to
their priority.

A binary min-heap is one way to implement a priority queue. In a min-priority
queue, a smaller key represents a higher priority, so the element with the
minimum key is always available at the root. An element can be more complex than
a single number—for example, a scheduled task might contain a name and deadline
while using the deadline as its priority key.

A binary heap has two defining properties:

1. **Complete-tree property:** Every level is full except possibly the last,
   which fills from left to right.
2. **Min-heap property:** Every parent key is less than or equal to the keys of
   its children.

The second property does not completely sort the heap. It only guarantees the
ordering relationships needed to keep the minimum key at the root.

## Array Representation

Binary heaps are typically stored in arrays rather than as linked tree nodes.
Because the tree is complete, its elements can be placed consecutively without
gaps. This avoids parent and child references while still allowing every
relationship to be calculated from an array index.

![A six-node min-heap shown as a complete binary tree alongside its array representation.](/blogs/min-heap/complete-binary-tree.svg)

_A complete binary tree fills each level from left to right. A min-heap also
keeps every parent less than or equal to its children._

For a node stored at index `i`:

- Left child: `2i + 1`
- Right child: `2i + 2`
- Parent: `floor((i - 1) / 2)`

Arrays also provide constant-time access by index and generally good cache
locality because elements occupy a contiguous region of memory. A node-based
representation is possible, but finding the next open position and maintaining
links introduces work that array indexing handles naturally.

> **Min-heap versus binary search tree:** A binary search tree orders its left
> and right subtrees to support searching. A min-heap only orders each parent
> relative to its children. Finding the minimum is constant time, but searching
> for an arbitrary value can still require examining the entire heap.

## Maintaining the Min-Heap Property

The primary min-priority queue operations are:

- `insert(value)`: Add an element.
- `first()`: Return the minimum element without removing it. This operation is
  also commonly named `peek()` or `min()`.
- `remove_first()`: Remove and return the minimum element. This operation is
  also commonly named `extract_min()`.

Insertion and removal can temporarily violate the min-heap property. The heap
repairs itself through **percolation**, which moves one value along a path until
the parent-child ordering is valid again.

### Insertion

Insertion begins by appending the new value at the next array index. This
preserves the complete-tree property. The new value is then compared with its
parent. If it is smaller, the two values swap and the comparison continues from
the parent’s former position. This process is called **percolating up**.

![Three stages of inserting 3 into a min-heap and percolating it above its parent 8.](/blogs/min-heap/insert-percolate-up.svg)

_The inserted value starts in the next open position and moves upward until its
parent has a smaller key._

```pseudocode
add value to the end of the heap

while value has a parent and value < parent:
    swap value with parent
```

The loop stops when the value reaches the root or its parent is already smaller.
At that point, both the complete-tree and min-heap properties are preserved.

### Removing the Minimum

`remove_first()` begins by saving the root value so it can be returned. Removing
the root directly would leave a gap at the top of the tree, so the final array
element moves into the root position. Removing the final element preserves the
complete-tree shape, but its value may now be larger than one or both children.

The replacement value is compared with its children and swapped with the smaller
child when necessary. Repeating this process moves the value downward until the
min-heap property is restored. This is called **percolating down**.

![Three stages of removing the root of a min-heap, moving the last value to the root, and percolating it downward.](/blogs/min-heap/remove-first-percolate-down.svg)

_After the root is removed, the final value moves to the root and swaps with the
smaller child until the min-heap property is restored._

```pseudocode
save the root value
move the last value to the root

while the value has a child smaller than it:
    swap value with its smaller child

return the saved root value
```

Choosing the smaller child is important. Swapping with the larger child could
leave a smaller sibling below the parent and immediately violate the min-heap
property again. As the value is percolating down, we can view priority values as
percolating upwards towards the root.

### Accessing the Minimum

After insertion and removal preserve the invariant, `first()` is simple. In an
array implementation, the minimum is stored at index `0`, so returning it takes
constant time. A complete implementation should still define what happens when
the heap is empty, such as raising an exception or returning a sentinel value.

## Time Complexity

A complete binary tree containing `n` elements has height `O(log n)`. Because
percolation follows only one path through the tree, the standard operation costs
are:

- `first()`: `O(1)`
- `insert()`: `O(log n)`
- `remove_first()`: `O(log n)`
- Searching for an arbitrary value: `O(n)`
- Space: `O(n)`

An individual dynamic-array resize can make a single append more expensive, but
appending remains amortized `O(1)` when the cost is averaged across many
insertions.

### Building a Heap: Repeated Insertion vs. Bottom-Up Construction

Separately, suppose we begin with an arbitrary array of `n` values that has not
yet been organized into a valid heap. We can arrange those values using
bottom-up heap construction in **`O(n)`** time.

Bottom-up heap construction begins at the lowest level containing parent nodes
and works upward toward the root. Near the bottom, there are many parents to
process, but each value can sift down only a short distance. As we move upward,
there are fewer parents, although each one may need to travel through more
levels. The number of parents decreases faster than the possible sifting
distance increases, so the combined work remains proportional to `n`, giving
bottom-up heap construction an `O(n)` runtime.

In this case, `O(n)` does not mean that the algorithm performs exactly `n`
operations. It means that the total work increases at a rate proportional to
`n`, even if the actual number of operations is some constant multiple of `n`.

This is faster than starting with an empty heap and inserting all n values
individually, since each insertion may require `O(log n)` time to percolate
upward, resulting in `O(n log n)` total time.

![Repeated insertion starts with an empty heap and percolates each new value upward, while bottom-up construction starts with the full array and sifts non-leaf nodes downward.](/blogs/min-heap/heap-construction-comparison.svg)

_Repeated insertion may move every new value through the tree. Bottom-up
construction does no work on the leaves, and most remaining nodes can move only
one or two levels._

## Practical Uses and Trade-Offs

Min-heaps are useful whenever a program repeatedly needs the smallest or soonest
item rather than a completely sorted collection. Common examples include:

- Selecting the next scheduled task or event.
- Choosing the next vertex in shortest-path algorithms such as Dijkstra’s.
- Merging sorted streams.
- Tracking the smallest or largest `k` elements in a data set.

Heaps can contain duplicate keys, but a basic heap is not stable: two elements
with equal priorities are not guaranteed to leave in insertion order. Stability
can be added by comparing a secondary sequence number. It is also important to
define empty-heap behavior and decide whether stored elements are plain keys or
objects whose priority comes from a field or comparison function.

A min-heap is a strong choice when retrieving and updating the minimum dominates
the workload. It is less suitable when the application needs fast arbitrary
searches or a fully sorted traversal.

## What Clicked for Me

The most useful mental model for me is that the array preserves the heap’s
**shape**, while percolation preserves its **ordering**. Appending or removing
the final array element keeps the complete tree compact. Percolating one value
up or down then repairs the only path whose ordering may have changed.

That separation makes the implementation feel much less mysterious. A min-heap
does not need to sort every element or search the entire tree after each
operation. It only needs to maintain enough structure to keep the next
highest-priority element at the root.
