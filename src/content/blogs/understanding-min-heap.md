---
title: 'Understanding MinHeap'
date: '2026-09-09'
excerpt: 'First Data Structure Revisit.'
readTime: '3 min read'
tags:
  - Data Structures
  - CS Fundamentals
  - MinHeap
  - Dynamic Array
---

### Initial Thoughts:

I’m starting my data structures revisiting journey with the min-heap, a data
structure that I’m unfamiliar with. I had at least some prior exposure to most
of the other data structures from the course, and I developed some intuition for
how they generally work. At the moment, however, I don’t have a clear mental
model of how a min-heap behaves or what makes it useful.

I don’t recall the implementation being particularly difficult, so developing a
lasting understanding of the min-heap would be a big win for me. Without further
ado, let’s jump into it.

### MinHeap Intro:

The abstract data type associated with a min-heap is the priority queue. The
word queue stands out to me because a traditional queue follows first in, first
out—just like people waiting in a line. A priority queue does not strictly
follow FIFO order. Instead, each element is assigned a priority, and the element
with the highest priority is removed first. In a min-priority queue, the
smallest value represents the highest priority; we want the element with the
lowest value out first.

One way to implement a priority queue is with a heap. A heap is typically
represented as a complete binary tree. In a min-heap, every node is less than or
equal to its children. As a result, the smallest value in the heap is always
located at the root.

Its important to recognize that heaps are complete binary trees, meaning that
its nodes fill each level from left to right without gaps. This allows for some
interesting implementations using dynamic arrays to represent complete binary
tree.

![A six-node min-heap shown as a complete binary tree alongside its array representation.](/blogs/min-heap/complete-binary-tree.svg)

_A complete binary tree fills each level from left to right. A min-heap also
keeps every parent less than or equal to its children._

For a node stored at index `i` in the array:

- Left child: `2i + 1`
- Right child: `2i + 2`
- Parent: `floor((i - 1) / 2)`

> **Note:** A min-heap is not the same as a binary search tree. A binary search
> tree enforces left-versus-right ordering rules to support efficient searching,
> while a min-heap only enforces an ordering relationship between each parent
> and its children. The min-heap property keeps the minimum element at the root
> for easy access, while the complete-tree property allows the heap to be stored
> efficiently in an array.

### Maintaining the min heap structure

# adding a value :
